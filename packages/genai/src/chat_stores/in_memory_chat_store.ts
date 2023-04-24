import { v4 as uuidv4 } from "uuid";
import type {
  ChatStore,
  Message,
  Conversation,
} from "src/chat_stores/chat_store";
import type { Prompt } from "src/prompt_stores/prompt_store";

class InMemoryChatStore implements ChatStore {
  private store = new Map<string, Conversation>();

  async createChat(
    prompt: Prompt,
    systemMessage: string
  ): Promise<Conversation> {
    const id = uuidv4();
    const conversation = {
      id,
      interactionCount: 0,
      prompt,
      systemMessage,
      messages: [],
    };
    this.store.set(id, conversation);
    return conversation;
  }

  async getChat(id: string): Promise<Conversation> {
    return this.store.get(id);
  }

  async updateChat(id: string, conversation: Conversation): Promise<void> {
    this.store.set(id, conversation);
    return;
  }
}

export { InMemoryChatStore };
