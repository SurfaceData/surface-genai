import type { Conversation } from "src/chat_stores/chat_store";
import type { GenerateResult } from "src/providers/provider";

interface InteractionLogger {
  saveInteraction(
    promptId: string,
    query: string,
    results: GenerateResult[],
    model: string,
    externalId: string
  ): Promise<string> | string;

  saveChat(conversation: Conversation, model: string): Promise<string>;

  saveInteractionEvaluation(
    requestId: string,
    interactionType: string,
    evaluationType: string,
    rating: string
  ): Promise<string>;
}

export type { InteractionLogger };
