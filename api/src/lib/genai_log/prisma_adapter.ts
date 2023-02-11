import type { PrismaClient } from '@prisma/client';

import type { Adapter } from 'src/lib/genai_log/adapter';

export function PrismaAdapter(p: PrismaClient): Adapter {
  return {
    getPromptsByLabel: (label: string) =>
      p.prompt.findMany({ where: { label } }),
  };
}
