import {
  ChatCompletionToolMessageParam,
  ChatCompletionUserMessageParam,
  ChatCompletionSystemMessageParam,
} from 'openai/resources';

export const generateSystemMessage = (message: string): ChatCompletionSystemMessageParam => ({
  role: 'system',
  content: message,
});

export const generateUserMessage = (message: string): ChatCompletionUserMessageParam => ({
  role: 'user',
  content: message,
});

export const generateToolMessage = (
  toolCallId: string,
  content: string,
): ChatCompletionToolMessageParam => ({
  role: 'tool',
  content,
  tool_call_id: toolCallId,
});
