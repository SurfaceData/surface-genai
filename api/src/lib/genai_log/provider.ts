interface GenerateResult {
  /**
   * The text completion result.
   */
  completion: string
}

interface ProviderConfig {
  /**
   * The remote service's URL.
   */
  url: string
  /**
   * The API Key verifying access to the remote service.
   */
  api_key: string
}

interface Provider extends ProviderConfig {
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
