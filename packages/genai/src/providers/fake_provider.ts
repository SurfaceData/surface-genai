import type { Conversation } from "src/chat_stores/chat_store";
import type {
  GenerateProviderConfig,
  GenerateRequest,
  GenerateResult,
} from "src/providers/provider";
import { GenerateProvider } from "src/providers/provider";

interface FakeProviderConfig extends GenerateProviderConfig {
  prefix: string;
}

class FakeProvider extends GenerateProvider {
  readonly prefix: string;

  constructor(config: FakeProviderConfig) {
    super(config);
    this.prefix = config.prefix;
  }

  async generate(request: GenerateRequest) {
    return [
      {
        text: `${this.prefix}-${request.text}`,
      },
    ];
  }

  async chat(conversation: Conversation) {
    return {
      text: `${this.prefix}-${
        conversation.messages[conversation.messages.length - 1].content
      }`,
    };
  }
}

export type { FakeProviderConfig };
export { FakeProvider };
