import type { GenerateResult } from 'src/lib/genai_log/provider'
import { Provider } from 'src/lib/genai_log/provider'

class GenaiLog {
  private readonly providers: Map<string, provider>
  private readonly providerNames: string[]

  constructor(providers: Provider[]) {
    this.providers = providers.reduce((result, provider) => {
      result.set(provider.name, provider)
      return result
    }, new Map<string, provider>())
    this.providerNames = [...this.providers.keys()]
  }

  generate(prompt: string): GenerateResult[] {
    var index = Math.floor(Math.random() * this.providerNames.length)
    const providerName = this.providerNames[index]
    const provider = this.providers.get(providerName)
    return provider.generate(prompt)
  }
}

export { GenaiLog }
