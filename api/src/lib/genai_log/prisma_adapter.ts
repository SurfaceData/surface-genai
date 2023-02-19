import type { Prisma, PrismaClient } from '@prisma/client';

import type { Adapter } from 'src/lib/genai_log/adapter';

export function PrismaAdapter(p: PrismaClient): Adapter {
  return {
    getPromptsByLabel: (label: string) =>
      p.prompt.findMany({ where: { label } }),

    getPromptsByLabelAndVariant: async (label: string, variant: string) => {
      const results = await p.prompt.findMany({
        where: { label, variant },
        take: 1,
      });
      return results[0];
    },

    saveInteraction: async (
      promptId: number,
      query: string,
      results: GenerateResult[],
      model: string,
      externalId: string
    ) => {
      const r = results as Prisma.JsonArray;
      const { id } = await p.interactionLog.create({
        data: {
          promptId,
          query,
          result: r,
          model,
          externalId,
        },
      });
      return id;
    },
  };
}
