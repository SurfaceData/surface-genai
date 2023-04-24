import type { PrismaClient } from "@prisma/client";

import type { Conversation } from "src/chat_stores/chat_store";
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

  async saveChat(conversation: Conversation, model: string) {
    const { id } = await this.prisma.chatLog.create({
      data: {
        promptId: conversation.prompt.id,
        systemMessage:
          conversation.interactionCount > 0 ? "" : conversation.systemMessage,
        interactionCount: conversation.interactionCount,
        messages: conversation.messages,
        model,
      },
    });
    return id;
  }
}

export { PrismaInteractionLogger };
