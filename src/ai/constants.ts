import { ChatCompletionTool, FunctionDefinition } from 'openai/resources';
import { FunctionName } from './enums';

// export const MODEL_NAME = 'gpt-3.5-turbo';
export const MODEL_NAME = 'gpt-4-turbo-preview';
export const TEMPERATURE = 0.1;
export const SEED = 123;

const GPT_FUNCTION_DEFINITIONS: FunctionDefinition[] = [
  {
    name: FunctionName.list,
    description: 'List of folders/files in the currently opened folder',
  },
  {
    name: FunctionName.openFolder,
    description: 'Open a folder. It returns array of folders/files in the opened folder',
    parameters: {
      type: 'object',
      properties: {
        folderName: {
          type: 'string',
          description: 'Name of the folder to open',
        },
      },
    },
  },
  {
    name: FunctionName.goBack,
    description:
      'Go back to the previous folder. It returns array of folders/files in the opened folder',
  },
  {
    name: FunctionName.readFile,
    description: 'Read file content. It returns file content as a string',
    parameters: {
      type: 'object',
      properties: {
        fileName: {
          type: 'string',
          description: 'Name of the file to read',
        },
      },
    },
  },
  {
    name: FunctionName.createFile,
    description: 'Create a file',
    parameters: {
      type: 'object',
      properties: {
        fileName: {
          type: 'string',
          description: 'Name of the file to create',
        },
        content: {
          type: 'string',
          description: 'Content of the file to create',
        },
      },
    },
  },
  {
    name: FunctionName.print,
    description:
      'Show some information to the user. Should be used when you need to call some another function but you want to show some information to the user in parallel. Should not be used for the final response.',
    parameters: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          description: 'Message to show to the user',
        },
      },
    },
  },
];

export const GPT_TOOLS: ChatCompletionTool[] = GPT_FUNCTION_DEFINITIONS.map(
  (functionDefinition) => ({
    type: 'function',
    function: functionDefinition,
  }),
);
