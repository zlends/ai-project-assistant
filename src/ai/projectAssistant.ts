import OpenAI from 'openai';
import { GPT_TOOLS, MODEL_NAME, SEED, TEMPERATURE } from './constants';
import {
  ChatCompletionMessageParam,
  ChatCompletionMessageToolCall,
  ChatCompletionToolMessageParam,
} from 'openai/resources';
import { FunctionName } from './enums';
import { generateSystemMessage, generateToolMessage, generateUserMessage } from './utils';
import { FileSystemController } from '../fileSystemController';
import { FunctionCallArguments } from './types';
import { GitController } from '../gitController';

export class ProjectAssistant {
  private openai: OpenAI = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
  });

  private fileSystemController: FileSystemController;
  private gitController: GitController;

  private context: string[];
  private usedTokens = 0;
  private readonly messages: ChatCompletionMessageParam[];

  constructor(pathToProject: string) {
    this.fileSystemController = new FileSystemController(pathToProject);
    this.gitController = new GitController(pathToProject);

    this.context = [
      'You are Project Assistant. You have access to navigate over project files, search for a specific file, read it, make some changes, commit it.',
      'Be laconic and precise in your human-like answers.',
      'You can gather as much information as you want over project if you need more context for resolving tasks.',
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
      model: MODEL_NAME,
      temperature: TEMPERATURE,
      seed: SEED,
    });

    this.messages.push(chatCompletion.choices[0].message);
    this.usedTokens += chatCompletion.usage?.total_tokens ?? 0;

    console.debug('[getGptResponse] usedTokens:', this.usedTokens);

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
          );
          break;
        case FunctionName.updateFile:
          args = this.getArgumentsObject<FunctionName.updateFile>(argumentsString);
          this.fileSystemController.updateFile(args.fileName, args.content);
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

  private getArgumentsObject<FN extends FunctionName>(functionArguments: string) {
    return JSON.parse(functionArguments) as FunctionCallArguments[FN];
  }
}
