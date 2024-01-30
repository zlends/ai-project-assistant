import OpenAI from 'openai';
import { GPT_TOOLS, model, SEED, TEMPERATURE } from './constants';
import {
  ChatCompletionMessageParam,
  ChatCompletionMessageToolCall,
  ChatCompletionToolMessageParam,
  CompletionUsage,
} from 'openai/resources';
import { FunctionName } from './enums';
import { generateSystemMessage, generateToolMessage, generateUserMessage } from './utils';
import { FunctionCallArguments } from './types';
import { FileSystem, Git } from '../controllers';

export class ProjectAssistant {
  private openai: OpenAI = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
  });

  private fileSystemController: FileSystem;
  private gitController: Git;

  private context: string[];
  private usedTokens = {
    input: 0,
    output: 0,
  };
  private readonly messages: ChatCompletionMessageParam[];

  constructor(pathToProject: string) {
    this.fileSystemController = new FileSystem(pathToProject);
    this.gitController = new Git(pathToProject);

    this.context = [
      'You are Project Assistant. You have access to navigate over project files, search for a specific file, read it, make some changes, commit it.',
      'Be laconic and precise in your human-like answers.',
      'You can gather as much information as you want over project if you need more context for resolving tasks.',
      // ToDo: add this when discussion will be implemented
      // 'When you are asked to implement some functionality, you can discuss and confirm steps and solutions with the user.',
      `Root directory name: ${this.fileSystemController.getRootDirectoryName()}`,
      `Root project structure:\n${this.fileSystemController.readFolder()}`,
    ];

    this.messages = [generateSystemMessage(this.context.join('\n\n'))];
  }

  async ask(message: string) {
    console.debug('[ask]', message);
    let response = await this.getGptResponse([generateUserMessage(message)]);

    while (response.tool_calls != null) {
      console.debug('[ask] tool_calls not null');
      const functionCallResponses: ChatCompletionToolMessageParam[] = [];

      for (const toolCall of response.tool_calls) {
        const functionCallResponse = await this.handleFunctionCall(toolCall);
        functionCallResponses.push(functionCallResponse);
      }

      response = await this.getGptResponse(functionCallResponses);
    }

    return response.content;
  }

  private async getGptResponse(messages: ChatCompletionMessageParam[]) {
    console.debug(
      '[getGptResponse]',
      messages.map((message) => message.role),
    );
    this.messages.push(...messages);

    const chatCompletion = await this.openai.chat.completions.create({
      tools: GPT_TOOLS,
      messages: this.messages,
      model: model.name,
      temperature: TEMPERATURE,
      seed: SEED,
    });

    this.messages.push(chatCompletion.choices[0].message);

    this.processUsedTokens(chatCompletion.usage);

    return chatCompletion.choices[0].message;
  }

  async handleFunctionCall(toolCall: ChatCompletionMessageToolCall) {
    let response: string;
    const functionName = toolCall.function.name;
    const argumentsString = toolCall.function.arguments;
    let args;

    console.debug(`[handleFunctionCall][${functionName}]`, argumentsString);

    try {
      switch (functionName) {
        case FunctionName.readFolder:
          response = this.fileSystemController
            .readFolder(
              this.getArgumentsObject<FunctionName.readFolder>(argumentsString).folderName,
            )
            .join('\n');
          break;
        case FunctionName.readFile:
          response = this.fileSystemController.readFile(
            this.getArgumentsObject<FunctionName.readFile>(argumentsString).fileName,
            this.getArgumentsObject<FunctionName.readFile>(argumentsString).isWithRowNumbers,
          );
          break;
        case FunctionName.replaceFile:
          args = this.getArgumentsObject<FunctionName.replaceFile>(argumentsString);
          this.fileSystemController.replaceFile(args.fileName, args.content);
          response = 'Successfully replaced file';
          break;
        case FunctionName.updateFile:
          args = this.getArgumentsObject<FunctionName.updateFile>(argumentsString);
          this.fileSystemController.updateFile(args.fileName, args.changes);
          response = 'Successfully updated file';
          break;
        case FunctionName.createFolder:
          args = this.getArgumentsObject<FunctionName.createFolder>(argumentsString);
          this.fileSystemController.createFolder(args.folderName);
          response = 'Successfully created folder';
          break;
        case FunctionName.createFile:
          args = this.getArgumentsObject<FunctionName.createFile>(argumentsString);
          this.fileSystemController.createFile(args.fileName, args.content);
          response = 'Successfully created file';
          break;
        case FunctionName.getGitDiff:
          response = await this.gitController.getGitDiff();
          break;
        case FunctionName.print:
          console.info(this.getArgumentsObject<FunctionName.print>(argumentsString).message);
          response = 'Successfully printed to user';
          break;
        default:
          response = 'Unknown function';
      }
    } catch (error: any) {
      response = error.message;
      console.error('[handleFunctionCall][error]', error.message);
    }

    return generateToolMessage(toolCall.id, response);
  }

  private processUsedTokens(usage?: CompletionUsage) {
    this.usedTokens.input += usage?.prompt_tokens ?? 0;
    this.usedTokens.output += usage?.completion_tokens ?? 0;

    const price =
      (this.usedTokens.input / 1000) * model.pricing.input +
      (this.usedTokens.output / 1000) * model.pricing.output;

    console.debug(
      '[getGptResponse] price:',
      `$${price.toFixed(2)}`,
      `(tokens: ${this.usedTokens.input}/${this.usedTokens.output})`,
    );
  }

  private getArgumentsObject<FN extends FunctionName>(functionArguments: string) {
    return JSON.parse(functionArguments) as FunctionCallArguments[FN];
  }
}
