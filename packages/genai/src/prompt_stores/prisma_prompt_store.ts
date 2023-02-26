import type { PrismaClient } from "@prisma/client";

import type { Prompt, PromptStore } from "src/prompt_stores/prompt_store";

class PrismaPromptStore implements PromptStore {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  getPromptsByLabel(label: string): Promise<Prompt[]> {
    return this.prisma.prompt.findMany({ where: { label } });
  }

  async getPromptsByLabelAndVariant(
    label: string,
    variant: string
  ): Promise<Prompt> {
    const results = await this.prisma.prompt.findMany({
      where: { label, variant },
      take: 1,
    });
    return results[0];
  }
}

export { PrismaPromptStore };
