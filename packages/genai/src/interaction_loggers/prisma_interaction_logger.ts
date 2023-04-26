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
        result: JSON.stringify(results),
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
        messages: JSON.stringify(conversation.messages),
        model,
      },
    });
    return id;
  }

  async saveInteractionEvaluation(
    requestId: string,
    interactionType: string,
    evaluationType: string,
    rating: string
  ) {
    if (interactionType === "chat") {
      const { id } = await this.prisma.chatEvaluationLog.create({
        data: {
          chatId: requestId,
          evaluationType,
          rating,
        },
      });
      return id;
    }
    const { id } = await this.prisma.interactionEvaluationLog.create({
      data: {
        interactionId: requestId,
        evaluationType,
        rating,
      },
    });
    return id;
  }
}

export { PrismaInteractionLogger };
