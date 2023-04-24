import type { Conversation } from "src/chat_stores/chat_store";
import type {
  GenerateProviderConfig,
  GenerateRequest,
  GenerateResult,
} from "src/providers/provider";
import { GenerateProvider } from "src/providers/provider";

interface OpenAIProviderConfig extends GenerateProviderConfig {
  /**
   * The OpenAI model key.
   */
  model: string;
}

/**
 * Defines an OpenAI {@code Provider} that queries the configured model.
 *
 * By default this is named `openai`.
 */
class OpenAIProvider extends GenerateProvider {
  readonly model: string;

  constructor(config: OpenAIProviderConfig) {
    super({
      name: "openai",
      ...config,
    });
    this.model = config.model;
  }

  async generate(request: GenerateRequest) {
    const result = await fetch(`${this.url}/v1/completions`, {
      method: "POST",
      body: JSON.stringify({
        prompt: request.text,
        model: this.model,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.api_key}`,
      },
    }).then((res) => res.json());

    return result.choices.map(({ text }) => ({ text }));
  }

  async chat(conversation: Conversation) {
    throw new Error("Unsupported");
    return { text: "unsupported" };
  }
}

export type { OpenAIProviderConfig };
export { OpenAIProvider };
