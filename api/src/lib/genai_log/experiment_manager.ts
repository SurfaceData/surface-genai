import type { Adapter, Prompt } from 'src/lib/genai_log/Adapter';
import type { Provider } from 'src/lib/genai_log/provider';

export interface ExperimentManager {
  name: string;

  selectPrompt: (
    externalId: string,
    adapter: Adapter,
    label: string
  ) => Promise<Prompt>;

  selectProvider: (
    externalId: string,
    providerMap: Map<string, Provider>,
    providerOrder: string[]
  ) => Promise<Provider>;
}
