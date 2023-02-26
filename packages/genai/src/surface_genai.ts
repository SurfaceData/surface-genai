import { Liquid } from "liquidjs";
import { v4 as uuidv4 } from "uuid";

import type { InteractionLogger } from "src/interaction_loggers/interaction_logger";
import type { ExperimentManager } from "src/experiment_managers/experiment_manager";
import type { PromptStore } from "src/prompt_stores/prompt_store";
import type { GenerateResult } from "src/providers/provider";

import { GenerateProvider } from "src/providers/provider";

interface SurfaceGenaiConfig {
  store: PromptStore;

  experimentManager: ExperimentManager;

  providers: GenerateProvider[];

  interactionLogger?: InteractionLogger;
}

interface SurfaceGenaiResult {
  results: GenerateResult[];
  requestId: string;
}

class SurfaceGenai {
  private readonly store: PromptStore;

  private readonly experimentManager: ExperimentManager;

  private interactionLogger?: InteractionLogger;

  private engine = new Liquid();

  /**
   * A map from provider names to their implementations.
   */
  private readonly providers: Map<string, GenerateProvider>;
  /**
   * The original ordering of provider names.
   */
  private readonly providerNames: string[];

  constructor(config: SurfaceGenaiConfig) {
    this.store = config.store;
    this.experimentManager = config.experimentManager;
    this.providers = config.providers.reduce((result, provider) => {
      result.set(provider.name, provider);
      return result;
    }, new Map<string, GenerateProvider>());
    this.providerNames = config.providers.map(({ name }) => name);
    this.interactionLogger = config.interactionLogger;
  }

  /**
   * Returns the array of {@code GenerateResult} objects generated for the
   * {@code prompt}.
   *
   * This selects a provider at random.
   */
  async generate(
    label: string,
    fields,
    externalId?: string
  ): Promise<SurfaceGenaiResult> {
    const id = externalId || uuidv4();
    // Select the prompt to use.
    const prompt = await this.experimentManager.selectPrompt(
      id,
      this.store,
      label
    );

    // Complete the prompt with the fields.
    const tpl = this.engine.parse(prompt.template);
    const renderedPrompt = await this.engine.render(tpl, fields);

    // Figure out which provider we will use.
    const provider = await this.experimentManager.selectProvider(
      id,
      this.providers,
      this.providerNames
    );

    // Generate.
    const results = await provider.generate({ text: renderedPrompt });

    const requestId = this.interactionLogger
      ? await this.interactionLogger.saveInteraction(
          prompt.id,
          renderedPrompt,
          results,
          provider.name,
          id
        )
      : uuidv4();

    // Done.
    return {
      requestId,
      results,
    };
  }
}

export type { SurfaceGenaiConfig, SurfaceGenaiResult };
export { SurfaceGenai };
