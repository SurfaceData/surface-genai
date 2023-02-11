interface GenerateResult {
  completion: string
}

class Provider {
  readonly name: string

  /**
   * Stores the provider's name.
   */
  constructor(name: string) {
    this.name = name
  }

  /**
   * Given a {@code prompt}, returns an array of completions.
   */
  generate(prompt: string): GenerateResult[]
}

export { Provider }
export type { GenerateResult }
