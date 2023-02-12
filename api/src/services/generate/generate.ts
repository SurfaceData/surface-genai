import { db } from 'src/lib/db';
import { genai } from 'src/lib/genai';

export const generate = ({ input }) => {
  const { fields } = input;
  const templateFields = JSON.parse(fields);
  return genai.generate('cat_namer', templateFields);
};
