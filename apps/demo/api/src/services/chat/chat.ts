import { genai } from 'src/lib/genai';

export const startChat = async ({ input }) => {
  const { label, fields } = input;
  const templateFields = JSON.parse(fields);
  const { id, messages } = await genai.startChat(label, templateFields);
  return { id, messages };
};
