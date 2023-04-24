import { Liquid } from "liquidjs";
import { v4 as uuidv4 } from "uuid";

import type { ChatStore, Conversation } from "src/chat_stores/chat_store";
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

  chatStore?: ChatStore;
}

interface SurfaceGenaiResult {
  results: GenerateResult[];
  requestId: string;
}

interface SurfaceGenaiConversationResult {
  conversation: Conversation;
  requestId: string;
}

class SurfaceGenai {
  private readonly store: PromptStore;

  private readonly experimentManager: ExperimentManager;

  private interactionLogger?: InteractionLogger;

  private chatStore?: ChatStore;

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
    this.chatStore = config.chatStore;
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

  async startChat(
    label: string,
    fields
  ): Promise<SurfaceGenaiConversationResult> {
    const id = uuidv4();
    // Select the prompt to use.
    const prompt = await this.experimentManager.selectPrompt(
      id,
      this.store,
      label
    );

    // Complete the prompt with the fields.
    const tpl = this.engine.parse(prompt.template);
    const systemMessage = await this.engine.render(tpl, fields);
    const conversation = await this.chatStore.createChat(prompt, systemMessage);
    const requestId = this.interactionLogger
      ? await this.interactionLogger.saveChat(conversation, "")
      : uuidv4();

    return {
      requestId,
      conversation,
    };
  }

  async chat(
    chatId: string,
    query: string
  ): Promise<SurfaceGenaiConversationResult> {
    const conversation = await this.chatStore.getChat(chatId);

    conversation.messages.push({
      source: "user",
      content: query,
    });
    // Figure out which provider we will use.
    const id = uuidv4();
    const provider = await this.experimentManager.selectProvider(
      id,
      this.providers,
      this.providerNames
    );

    // Generate.
    const result = await provider.chat(conversation);

    conversation.messages.push({
      source: "assistant",
      content: result.text,
    });
    conversation.interactionCount += 1;
    await this.chatStore.updateChat(chatId, conversation);

    const requestId = this.interactionLogger
      ? await this.interactionLogger.saveChat(conversation, provider.name)
      : uuidv4();

    // Done.
    return {
      requestId,
      conversation,
    };
  }
}

export type { SurfaceGenaiConfig, SurfaceGenaiResult };
export { SurfaceGenai };
