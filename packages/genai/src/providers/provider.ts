import type { Conversation } from "src/chat_stores/chat_store";

interface GenerateRequest {
  text: string;
  max_tokens?: number;
  number_of_completions?: number;
}

interface GenerateResult {
  text: string;
}

class GenerateProviderConfig {
  name: string;
  url?: string;
  api_key?: string;
}

abstract class GenerateProvider {
  readonly name: string;
  protected readonly url: string;
  protected readonly api_key: string;

  constructor(config: GenerateProviderConfig) {
    this.name = config.name;
    this.url = config.url || "";
    this.api_key = config.api_key || "";
  }

  abstract generate(request: GenerateRequest): Promise<GenerateResult[]>;
  abstract chat(conversation: Conversation): Promise<GenerateResult>;
}

export { GenerateProvider };
export type { GenerateProviderConfig, GenerateRequest, GenerateResult };
