import OpenAI from 'openai';
import { GPT_TOOLS, MODEL_NAME, SEED, TEMPERATURE } from './constants';
import {
  ChatCompletionMessageParam,
  ChatCompletionMessageToolCall,
  ChatCompletionToolMessageParam,
} from 'openai/resources';
import { FunctionName } from './enums';
import { generateSystemMessage, generateToolMessage, generateUserMessage } from './utils';
import { FileSystem } from '../fileSystem';
import { FunctionCallArguments } from './types';

export class GPT {
  private fileSystem = new FileSystem();

  private context: string[] = [
    'You are Project Assistant. You have access to navigate over project files, search for a specific file, read it, make some changes, commit it.',
    'Be laconic and precise in your human-like answers.',
    'You can gather as much information as you want over project if you need more context for resolving tasks.',
    `Root directory name: ${this.fileSystem.getRootDirectoryName()}`,
    `Root project structure:\n${this.fileSystem.getList().join('\n')}`,
  ];

  private openai: OpenAI = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
  });

  private messages: ChatCompletionMessageParam[] = [
    generateSystemMessage(this.context.join('\n\n')),
  ];

  private usedTokens = 0;

  async ask(message: string) {
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
      messages.map((message) => JSON.stringify(message, null, '  ')),
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

    console.debug('[getGptResponse] chatCompletion:', JSON.stringify(chatCompletion.choices[0].message, null, '  '));
    console.debug('[getGptResponse] usedTokens:', this.usedTokens);

    return chatCompletion.choices[0].message;
  }

  async handleFunctionCall(toolCall: ChatCompletionMessageToolCall) {
    let response: string;
    const functionName = toolCall.function.name;
    const argumentsString = toolCall.function.arguments;

    console.debug(`[handleFunctionCall][${functionName}]`, argumentsString);

    try {
      switch (functionName) {
        case FunctionName.list:
          response = this.fileSystem.getList().join('\n');
          break;
        case FunctionName.openFolder:
          response = this.fileSystem
            .openFolder(
              this.getArgumentsObject<FunctionName.openFolder>(argumentsString).folderName,
            )
            .join('\n');
          break;
        case FunctionName.goBack:
          response = this.fileSystem.goBack().join('\n');
          break;
        case FunctionName.readFile:
          response = this.fileSystem.readFile(
            this.getArgumentsObject<FunctionName.readFile>(argumentsString).fileName,
          );
          break;
        case FunctionName.createFile:
          const args = this.getArgumentsObject<FunctionName.createFile>(argumentsString);
          this.fileSystem.createFile(args.fileName, args.content);
          response = 'Successfully created file';
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
    }

    return generateToolMessage(toolCall.id, response);
  }

  private getArgumentsObject<FN extends FunctionName>(functionArguments: string) {
    return JSON.parse(functionArguments) as FunctionCallArguments[FN];
  }
}

export default new GPT();
