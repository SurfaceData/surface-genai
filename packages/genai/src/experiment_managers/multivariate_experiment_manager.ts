import md5 from "md5";

import type { ExperimentManager } from "src/experiment_managers/experiment_manager";
import type { PromptStore } from "src/prompt_stores/prompt_store";

import { GenerateProvider } from "src/providers/provider";

interface MultivariateExperimentOption {
  name: string;
  weight: number;
  variant?: string;
  provider?: string;
}

interface PromptCriteria {
  onLabel?: string;
}

interface ProviderCriteria {
  onAny?: boolean;
}

interface MultivariateExperiment {
  name: string;
  options: MultivariateExperimentOption[];
  promptCriteria?: PromptCriteria;
  providerCriteria?: ProviderCriteria;
}

interface MultivariateExperimentManagerConfig {
  experiments: MultivariateExperiment[];
}

class MultivariateExperimentManager implements ExperimentManager {
  private promptExperimentMap: Map<string, MultivariateExperiment>;

  private providerExperiment?: MultivariateExperiment;

  constructor(config: MultivariateExperimentManagerConfig) {
    // Extract all the prompt based experiments and store them in a map.
    this.promptExperimentMap = config.experiments.reduce(
      (result, experiment) => {
        if (!experiment?.promptCriteria?.onLabel) {
          return result;
        }
        // Make sure the options are sorted in descending order so that when we
        // pick randomly we always select the most likely first.
        experiment.options.sort((a, b) => b.weight - a.weight);
        result.set(experiment.promptCriteria.onLabel, experiment);
        return result;
      },
      new Map<string, MultivariateExperiment>()
    );

    this.providerExperiment = config.experiments.find(
      (experiment) => experiment?.providerCriteria?.onAny
    );
    if (this.providerExperiment) {
      this.providerExperiment.options.sort((a, b) => b.weight - a.weight);
    }
  }

  async selectPrompt(externalId: string, store: PromptStore, label: string) {
    // If there's no experiment for the prompt, always return the first
    // prompt returned by the adapter.
    if (!this.promptExperimentMap.has(label)) {
      const prompts = await store.getPromptsByLabel(label);
      return prompts[0];
    }

    const experiment = this.promptExperimentMap.get(label);
    const option = this.getExperimentOption(experiment, externalId);
    return store.getPromptsByLabelAndVariant(label, option.variant);
  }

  selectProvider(
    externalId: string,
    providerMap: Map<string, GenerateProvider>,
    providerOrder: string[]
  ) {
    if (!this.providerExperiment) {
      return providerMap.get(providerOrder[0]);
    }

    const option = this.getExperimentOption(
      this.providerExperiment,
      externalId
    );
    return providerMap.get(option.provider);
  }

  getExperimentOption(experiment, id) {
    const md5HashHex = md5(`${experiment.name}${id}`).substr(0, 8);
    const md5HashInt = parseInt(`0x${md5HashHex}`, 16);
    const maxInt = 0xffffffff;
    let prob = md5HashInt / maxInt;
    // Find the first option that triggers the experiment.
    return experiment.options.find(({ weight }) => {
      prob -= weight;
      return prob < 0;
    });
  }
}

export type {
  MultivariateExperiment,
  MultivariateExperimentManagerConfig,
  MultivariateExperimentOption,
  PromptCriteria,
  ProviderCriteria,
};

export { MultivariateExperimentManager };
