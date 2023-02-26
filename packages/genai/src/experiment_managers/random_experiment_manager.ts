import type { ExperimentManager } from "src/experiment_managers/experiment_manager";
import type { Prompt, PromptStore } from "src/prompt_stores/prompt_store";

import { GenerateProvider } from "src/providers/provider";

class RandomExperimentManager implements ExperimentManager {
  async selectPrompt(externalId: string, store: PromptStore, label: string) {
    const prompts = await store.getPromptsByLabel(label);
    var promptIndex = Math.floor(Math.random() * prompts.length);
    return prompts[promptIndex];
  }

  async selectProvider(
    externalId: string,
    providerMap: Map<string, GenerateProvider>,
    providerOrder: string[]
  ) {
    var providerIndex = Math.floor(Math.random() * providerOrder.length);
    const providerName = providerOrder[providerIndex];
    return providerMap.get(providerName);
  }
}

export { RandomExperimentManager };
