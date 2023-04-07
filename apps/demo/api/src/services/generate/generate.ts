import { db } from 'src/lib/db';
import { genai } from 'src/lib/genai';

export const generate = ({ input }) => {
  const { label, fields } = input;
  const templateFields = JSON.parse(fields);
  return genai.generate(label, templateFields);
};
