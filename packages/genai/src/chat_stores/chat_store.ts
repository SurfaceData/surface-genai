import type { Prompt } from "src/prompt_stores/prompt_store";

interface Conversation {
  id: string;
  prompt: Prompt;
  messages: Array<Message>;
}

interface Message {
  source: "user" | "assistant";
  content: string;
}

interface ChatStore {
  createChat(prompt: Prompt): Promise<Conversation>;

  getChat(id: string): Promise<Conversation>;

  updateChat(id: string, newMessages: Array<Message>): Promise<Conversation>;
}

export type { ChatStore, Message, Conversation };
