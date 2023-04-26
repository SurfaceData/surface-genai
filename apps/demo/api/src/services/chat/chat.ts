import { genai } from 'src/lib/genai';

export const startChat = async ({ input }) => {
  const { label, fields } = input;
  const templateFields = JSON.parse(fields);
  const { requestId, conversation } = await genai.startChat(
    label,
    templateFields
  );
  const { id, messages } = conversation;
  return { id, requestId, messages };
};

export const chat = async ({ input }) => {
  const { id, query } = input;
  const { requestId, conversation, newMessages } = await genai.chat(id, query);
  return { id: conversation.id, requestId, messages: newMessages };
};
