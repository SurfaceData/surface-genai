import type { GenerateResult } from 'src/lib/genai_log/provider'
import { Provider } from 'src/lib/genai_log/provider'

class GenaiLLMProvider extends Provider {
  private readonly providerUrl: string
  private readonly providerKey: string

  constructor(providerUrl: string, providerKey: string) {
    super('genai_llm')
    this.providerUrl = providerUrl
    this.providerKey = providerKey
  }

  async generate(prompt: string): GenerateResult[] {
    const generationResults = await fetch(
      `${this.providerUrl}/generate?prompt=${prompt}`
    ).then((res) => res.json())
    return generationResults.map(({ completion }) => ({
      completion,
    }))
  }
}

export { GenaiLLMProvider }
