import { db } from 'src/lib/db';
import { genai } from 'src/lib/genai';

export const generate = async ({ input }) => {
  const { fields } = input;
  const templateFields = JSON.parse(fields);

  const results = await genai.generate('cat_namer', templateFields);
  return {
    results: results.map(({ completion }) => ({
      output: completion,
    })),
  };
};
