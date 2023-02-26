import type { PrismaClient } from "@prisma/client";

import type { GenerateResult } from "src/providers/provider";
import type { InteractionLogger } from "src/interaction_loggers/interaction_logger";

class PrismaInteractionLogger implements InteractionLogger {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async saveInteraction(
    promptId: string,
    query: string,
    results: GenerateResult[],
    model: string,
    externalId: string
  ) {
    const { id } = await this.prisma.interactionLog.create({
      data: {
        promptId,
        query,
        result: results,
        model,
        externalId,
      },
    });
    return id;
  }
}

export { PrismaInteractionLogger };
