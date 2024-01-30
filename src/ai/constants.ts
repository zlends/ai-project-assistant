import { ChatCompletionTool, FunctionDefinition } from 'openai/resources';
import { EChangeType, FunctionName } from './enums';

export const models = {
  gpt3_5_turbo: {
    name: 'gpt-3.5-turbo-1106',
    pricing: {
      input: 0.001, // $ per 1K tokens
      output: 0.002, // $ per 1K tokens
    },
  },
  gpt4_turbo: {
    name: 'gpt-4-0125-preview',
    pricing: {
      input: 0.01, // $ per 1K tokens
      output: 0.03, // $ per 1K tokens
    },
  },
  gpt4: {
    name: 'gpt-4',
    pricing: {
      input: 0.03, // $ per 1K tokens
      output: 0.06, // $ per 1K tokens
    },
  },
  gpt4_32k: {
    name: 'gpt-4-32k',
    pricing: {
      input: 0.06, // $ per 1K tokens
      output: 0.12, // $ per 1K tokens
    },
  },
};

export const model = models.gpt4_turbo;

export const TEMPERATURE = 0;
export const SEED = 123;

const readFolder: FunctionDefinition = {
  name: FunctionName.readFolder,
  description: 'Get a list of files/folders in the provided folder',
  parameters: {
    type: 'object',
    properties: {
      folderName: {
        type: 'string',
        description: 'Name of the folder to read, relative to the root directory',
      },
    },
  },
};

const readFile: FunctionDefinition = {
  name: FunctionName.readFile,
  description: 'Read file content. It returns file content as a string',
  parameters: {
    type: 'object',
    properties: {
      fileName: {
        type: 'string',
        description: 'Name of the file to read',
      },
      isWithRowNumbers: {
        type: 'boolean',
        description:
          'Should return file content with row numbers at the beginning. Use it when you need to update the file',
      },
    },
    required: ['fileName'],
  },
};

const replaceFile: FunctionDefinition = {
  name: FunctionName.replaceFile,
  description: 'Replace file content',
  parameters: {
    type: 'object',
    properties: {
      fileName: {
        type: 'string',
        description: 'Name of the file to replace',
      },
      content: {
        type: 'string',
        description: 'New content of the file',
      },
    },
  },
};

const updateFile: FunctionDefinition = {
  name: FunctionName.updateFile,
  description: 'Update file content',
  parameters: {
    type: 'object',
    properties: {
      fileName: {
        type: 'string',
        description: 'Name of the file to update',
      },
      changes: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              description: 'Type of the change',
              enum: [EChangeType.add, EChangeType.remove, EChangeType.replace],
            },
            startRow: {
              type: 'number',
              description: 'Start row of the change',
            },
            endRow: {
              type: 'number',
              description: 'End row of the change, will be equal to `startRow` for `add` type',
            },
            content: {
              type: 'string',
              description: 'New content of the change, is not required for `remove` type',
            },
          },
        },
      },
    },
  },
};

const createFolder: FunctionDefinition = {
  name: FunctionName.createFolder,
  description: 'Create a folder',
  parameters: {
    type: 'object',
    properties: {
      folderName: {
        type: 'string',
        description: 'Name of the folder to create',
      },
    },
  },
};

const createFile: FunctionDefinition = {
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
};

const getGitDiff: FunctionDefinition = {
  name: FunctionName.getGitDiff,
  description: 'Get git diff of the current folder',
};

const print: FunctionDefinition = {
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
};

const GPT_FUNCTION_DEFINITIONS: FunctionDefinition[] = [
  readFolder,
  readFile,
  replaceFile,
  updateFile,
  createFolder,
  createFile,
  getGitDiff,
  print,
];

export const GPT_TOOLS: ChatCompletionTool[] = GPT_FUNCTION_DEFINITIONS.map(
  (functionDefinition) => ({
    type: 'function',
    function: functionDefinition,
  }),
);
