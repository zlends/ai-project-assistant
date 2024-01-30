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
