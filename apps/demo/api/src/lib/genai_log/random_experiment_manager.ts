import type { Adapter } from 'src/lib/genai_log/adapter';
import type { ExperimentManager } from 'src/lib/genai_log/experiment_manager';
import type { Provider } from 'src/lib/genai_log/provider';

export default function RandomExperimentManager(): ExperimentManager {
  return {
    name: 'random',
    selectPrompt: async (
      externalId: string,
      adapter: Adapter,
      label: string
    ) => {
      const prompts = await adapter.getPromptsByLabel(label);
      var promptIndex = Math.floor(Math.random() * prompts.length);
      return prompts[promptIndex];
    },

    selectProvider: (
      externalId: string,
      providerMap: Map<string, Provider>,
      providerOrder: string[]
    ) => {
      var providerIndex = Math.floor(Math.random() * providerOrder.length);
      const providerName = providerOrder[providerIndex];
      return providerMap.get(providerName);
    },
  };
}
