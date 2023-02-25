import { GenerateProvider } from '@surface-data/genai';

import type { Adapter, Prompt } from 'src/lib/genai_log/Adapter';

export interface ExperimentManager {
  name: string;

  selectPrompt: (
    externalId: string,
    adapter: Adapter,
    label: string
  ) => Promise<Prompt>;

  selectProvider: (
    externalId: string,
    providerMap: Map<string, GenerateProvider>,
    providerOrder: string[]
  ) => Promise<GenerateProvider>;
}
