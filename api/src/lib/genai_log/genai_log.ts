import { Liquid } from 'liquidjs';

import type { GenerateResult, Provider } from 'src/lib/genai_log/provider';
import type { Adapter } from 'src/lib/genai_log/adapter';

export interface GenaiLogConfig {
  adapter: Adapter;

  /**
   * The list of LLM Generator {@code Provider}s.
   */
  providers: Provider[];
}

class GenaiLog {
  private readonly adapter: Adapter;

  private engine = new Liquid();

  /**
   * A map from provider names to their implementations.
   */
  private readonly providers: Map<string, provider>;
  /**
   * The original ordering of provider names.
   */
  private readonly providerNames: string[];

  constructor(config: GenaiLogConfig) {
    this.adapter = config.adapter;
    this.providers = config.providers.reduce((result, provider) => {
      result.set(provider.name, provider);
      return result;
    }, new Map<string, provider>());
    this.providerNames = config.providers.map(({ name }) => name);
  }

  /**
   * Returns the array of {@code GenerateResult} objects generated for the
   * {@code prompt}.
   *
   * This selects a provider at random.
   */
  async generate(label: string, fields): GenerateResult[] {
    // Figure out which prompt we will use.
    const prompts = await this.adapter.getPromptsByLabel(label);
    var promptIndex = Math.floor(Math.random() * prompts.length);
    const { variant, template } = prompts[promptIndex];

    // Complete the prompt with the fields.
    const tpl = this.engine.parse(template);
    const prompt = await this.engine.render(tpl, fields);

    // Figure out which provider we will use.
    var providerIndex = Math.floor(Math.random() * this.providerNames.length);
    const providerName = this.providerNames[providerIndex];
    const provider = this.providers.get(providerName);
    const results = await provider.generate(provider, prompt);

    // Log everything.
    await this.adapter.saveInteraction(
      prompts[promptIndex].id,
      prompt,
      results,
      providerName
    );

    // Done.
    return results;
  }
}

export { GenaiLog };
