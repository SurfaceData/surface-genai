import type { GenerateResult } from "src/providers/provider";

interface InteractionLogger {
  saveInteraction(
    promptId: string,
    query: string,
    results: GenerateResult[],
    model: string,
    externalId: string
  ): Promise<string> | string;
}

export type { InteractionLogger };
