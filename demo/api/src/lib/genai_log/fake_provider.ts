import type {
  GenerateResult,
  Provider,
  ProviderConfig,
} from 'src/lib/genai_log/provider';

export interface FakeProviderConfig extends ProviderConfig {
  prefix: string;
}

export interface FakeProvider extends Provider {}

/**
 */
export default function Fake(options: FakeProviderConfig): FakeProvider {
  return {
    name: `fake-${options.prefix}`,
    generate: async (provider: Provider, prompt: string): GenerateResult[] => {
      return [
        {
          completion: `${options.prefix}-${prompt}`,
        },
      ];
    },
  };
}
