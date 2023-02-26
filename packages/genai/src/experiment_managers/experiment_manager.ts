import type { Prompt, PromptStore } from "src/prompt_stores/prompt_store";

import { GenerateProvider } from "src/providers/provider";

interface ExperimentManager {
  selectPrompt(
    externalId: string,
    store: PromptStore,
    label: string
  ): Promise<Prompt> | Prompt;

  selectProvider(
    externalId: string,
    providerMap: Map<string, GenerateProvider>,
    providerOrder: string[]
  ): Promise<GenerateProvider> | GenerateProvider;
}

export type { ExperimentManager };
