import type { Adapter } from 'src/lib/genai_log/adapter';
import type { ExperimentManager } from 'src/lib/genai_log/experiment_manager';
import type { GenerateResult, Provider } from 'src/lib/genai_log/provider';

import { Liquid } from 'liquidjs';
import { v4 as uuidv4 } from 'uuid';

export interface GenaiLogConfig {
  adapter: Adapter;

  experimentManager: ExperimentManager;

  /**
   * The list of LLM Generator {@code Provider}s.
   */
  providers: Provider[];
}

export interface GenaiResult {
  results: GenerateResult[];
  requestId: number;
}

class GenaiLog {
  private readonly adapter: Adapter;

  private readonly experimentManager: ExperimentManager;

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
    this.experimentManager = config.experimentManager;
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
  async generate(label: string, fields, externalId?: string): GenaiResult {
    const id = externalId || uuidv4();
    // Select the prompt to use.
    const prompt = await this.experimentManager.selectPrompt(
      id,
      this.adapter,
      label
    );

    // Complete the prompt with the fields.
    const tpl = this.engine.parse(prompt.template);
    const renderedPrompt = await this.engine.render(tpl, fields);

    // Figure out which provider we will use.
    const provider = this.experimentManager.selectProvider(
      id,
      this.providers,
      this.providerNames
    );

    // Generate.
    const results = await provider.generate(provider, renderedPrompt);

    // Log everything.
    const requestId = await this.adapter.saveInteraction(
      prompt.id,
      renderedPrompt,
      results,
      provider.name,
      id
    );

    // Done.
    return {
      requestId,
      results,
    };
  }
}

export { GenaiLog };
