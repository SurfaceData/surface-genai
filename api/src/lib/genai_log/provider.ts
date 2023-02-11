interface GenerateResult {
  completion: string
}

interface ProviderConfig {
  url: string
  api_key: string
}

interface Provider {
  /**
   * Stores the provider's name.
   */
  readonly name: string

  /**
   * Given a {@code prompt}, returns an array of completions.
   */
  generate: (prompt: string) => Promise<GenerateResult[]>
}

export type { GenerateResult, Provider, ProviderConfig }
