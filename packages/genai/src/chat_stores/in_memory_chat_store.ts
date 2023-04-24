import { v4 as uuidv4 } from "uuid";
import type {
  ChatStore,
  Message,
  Conversation,
} from "src/chat_stores/chat_store";
import type { Prompt } from "src/prompt_stores/prompt_store";

class InMemoryChatStore implements ChatStore {
  private store = new Map<string, Conversation>();

  async createChat(prompt: Prompt): Promise<Conversation> {
    const id = uuidv4();
    const conversation = {
      id,
      prompt,
      messages: [],
    };
    this.store.set(id, conversation);
    return conversation;
  }

  async getChat(id: string): Promise<Conversation> {
    return this.store.get(id);
  }

  async updateChat(
    id: string,
    newMessages: Array<Message>
  ): Promise<Conversation> {
    const conversation = this.store.get(id);
    conversation.messages = [...conversation.messages, ...newMessages];
    this.store.set(id, conversation);
    return conversation;
  }
}

export { InMemoryChatStore };
