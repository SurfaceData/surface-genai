import type { Conversation } from "src/chat_stores/chat_store";
import type {
  GenerateProviderConfig,
  GenerateRequest,
  GenerateResult,
} from "src/providers/provider";
import { GenerateProvider } from "src/providers/provider";

class SurfaceLLMProvider extends GenerateProvider {
  constructor(config: GenerateProviderConfig) {
    super(config);
  }

  async generate(request: GenerateRequest) {
    const response = await fetch(`${this.url}/generate`, {
      method: "POST",
      body: JSON.stringify({
        prompt: request.text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    return response.map(({ completion }) => ({
      text: completion,
    }));
  }

  async chat(conversation: Conversation) {
    const system_prompt =
      conversation.systemMessage !== "" ? conversation.systemMessage : null;
    const body = JSON.stringify({
      conversation: {
        system_prompt,
        messages: conversation.messages,
      },
    });
    const response = await fetch(`${this.url}/chat`, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    return { text: response.results[0].content };
  }
}

export { SurfaceLLMProvider };
