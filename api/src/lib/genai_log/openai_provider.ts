import type {
  GenerateResult,
  Provider,
  ProviderConfig,
} from 'src/lib/genai_log/provider'

export interface OpenAIProviderConfig extends ProviderConfig {
  /**
   * The OpenAI model key.
   */
  readonly model: string
}

export interface OpenAIProvider extends Provider {
  /**
   * The OpenAI model key.
   */
  readonly model: string
}

/**
 * Defines an OpenAI {@code Provider} that queries the configured model.
 *
 * By default this is named `openai`.
 */
export default function OpenAI(options: OpenAIProviderConfig): OpenAIProvider {
  return {
    name: 'openai',
    generate: async (
      provider: OpenAIProvider,
      prompt: string
    ): GenerateResult[] => {
      const result = await fetch(`${provider.url}/v1/completions`, {
        method: 'POST',
        body: JSON.stringify({
          prompt,
          model: provider.model,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${provider.api_key}`,
        },
      }).then((res) => res.json())
      return result.choices.map(({ text }) => ({
        completion: text,
      }))
    },
    ...options,
  }
}
