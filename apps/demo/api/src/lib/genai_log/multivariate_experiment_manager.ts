import { GenerateProvider } from '@surface-data/genai';

import type { Adapter } from 'src/lib/genai_log/adapter';
import type { ExperimentManager } from 'src/lib/genai_log/experiment_manager';

import md5 from 'md5';

export interface MultivariateExperimentOption {
  name: string;
  weight: number;
  variant?: string;
  provider?: string;
}

export interface PromptCriteria {
  onLabel?: string;
}

export interface ProviderCriteria {
  onAny?: boolean;
}

export interface MultivariateExperiment {
  name: string;
  options: MultivariateExperimentOption[];
  promptCriteria?: PromptCriteria;
  providerCriteria?: ProviderCriteria;
}

export interface MultivariateExperimentManagerConfig {
  experiments: MultivariateExperiment[];
}

const getExperimentOption = (experiment, id) => {
  const md5HashHex = md5(`${experiment.name}${id}`).substr(0, 8);
  const md5HashInt = parseInt(`0x${md5HashHex}`, 16);
  const maxInt = 0xffffffff;
  let prob = md5HashInt / maxInt;
  // Find the first option that triggers the experiment.
  return experiment.options.find(({ weight }) => {
    prob -= weight;
    return prob < 0;
  });
};

export default function MultivariateExperimentManager(
  config: MultivariateExperimentManagerConfig
): ExperimentManager {
  // Extract all the prompt based experiments and store them in a map.
  const promptExperimentMap = config.experiments.reduce(
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
    new Map()
  );
  const providerExperiment = config.experiments.find(
    (experiment) => experiment?.providerCriteria?.onAny
  );
  if (providerExperiment) {
    providerExperiment.options.sort((a, b) => b.weight - a.weight);
  }

  return {
    name: 'multivariate',
    selectPrompt: async (
      externalId: string,
      adapter: Adapter,
      label: string
    ) => {
      // If there's no experiment for the prompt, always return the first
      // prompt returned by the adapter.
      if (!promptExperimentMap.has(label)) {
        const prompts = await adapter.getPromptsByLabel(label);
        return prompts[0];
      }

      const experiment = promptExperimentMap.get(label);
      const option = getExperimentOption(experiment, externalId);
      return await adapter.getPromptsByLabelAndVariant(label, option.variant);
    },

    selectProvider: (
      externalId: string,
      providerMap: Map<string, GenerateProvider>,
      providerOrder: string[]
    ) => {
      if (!providerExperiment) {
        console.log('Selecting the prod provider');
        return providerMap.get(providerOrder[0]);
      }

      const option = getExperimentOption(providerExperiment, externalId);
      console.log(option);
      return providerMap.get(option.provider);
    },
  };
}
