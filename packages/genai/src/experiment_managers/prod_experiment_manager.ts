import type { ExperimentManager } from "src/experiment_managers/experiment_manager";
import type { Prompt, PromptStore } from "src/prompt_stores/prompt_store";

import { GenerateProvider } from "src/providers/provider";

class ProdExperimentManager implements ExperimentManager {
  async selectPrompt(externalId: string, store: PromptStore, label: string) {
    const prompts = await store.getPromptsByLabel(label);
    console.log(prompts);
    return prompts[0];
  }

  async selectProvider(
    externalId: string,
    providerMap: Map<string, GenerateProvider>,
    providerOrder: string[]
  ) {
    const providerName = providerOrder[0];
    return providerMap.get(providerName);
  }
}

export { ProdExperimentManager };
