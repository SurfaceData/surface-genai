import type { Prisma, PrismaClient } from '@prisma/client';

import type { Adapter } from 'src/lib/genai_log/adapter';

export function PrismaAdapter(p: PrismaClient): Adapter {
  return {
    getPromptsByLabel: (label: string) =>
      p.prompt.findMany({ where: { label } }),

    saveInteraction: async (
      promptId: number,
      query: string,
      results: GenerateResult[],
      model: string
    ) => {
      const r = results as Prisma.JsonArray;
      const { id } = await p.interactionLog.create({
        data: {
          promptId,
          query,
          result: r,
          model,
        },
      });
      return id;
    },
  };
}
