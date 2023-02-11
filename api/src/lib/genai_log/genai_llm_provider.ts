import type {
  GenerateResult,
  Provider,
  ProviderConfig,
} from 'src/lib/genai_log/provider'

export interface GenaiLLMProvider extends Provider {
  url: string
  api_key: string
}

export default function GenaiLLM(options: ProviderConfig): GenaiLLMProvider {
  return {
    name: 'genai_llm',
    generate: async (provider: Provider, prompt: string): GenerateResult[] => {
      const generationResults = await fetch(
        `${provider.url}/generate?prompt=${prompt}`
      ).then((res) => res.json())
      return generationResults.map(({ completion }) => ({
        completion,
      }))
    },
    ...options,
  }
}
