import type { GenerateResult, Provider } from 'src/lib/genai_log/provider'

export interface GenaiLogConfig {
  /**
   * The list of LLM Generator {@code Provider}s.
   */
  providers: Provider[]
}

class GenaiLog {
  /**
   * A map from provider names to their implementations.
   */
  private readonly providers: Map<string, provider>
  /**
   * The original ordering of provider names.
   */
  private readonly providerNames: string[]

  constructor(config: GenaiLogConfig) {
    this.providers = config.providers.reduce((result, provider) => {
      result.set(provider.name, provider)
      return result
    }, new Map<string, provider>())
    this.providerNames = config.providers.map(({ name }) => name)
  }

  /**
   * Returns the array of {@code GenerateResult} objects generated for the
   * {@code prompt}.
   *
   * This selects a provider at random.
   */
  generate(prompt: string): GenerateResult[] {
    var index = Math.floor(Math.random() * this.providerNames.length)
    const providerName = this.providerNames[index]
    const provider = this.providers.get(providerName)
    return provider.generate(provider, prompt)
  }
}

export { GenaiLog }
