import type { Prompt } from "src/prompt_stores/prompt_store";

interface Conversation {
  id: string;
  interactionCount: number;
  prompt: Prompt;
  systemMessage: string;
  messages: Array<Message>;
}

interface Message {
  source: "user" | "assistant";
  content: string;
}

interface ChatStore {
  createChat(prompt: Prompt, systemMessage: string): Promise<Conversation>;

  getChat(id: string): Promise<Conversation>;

  updateChat(id: string, conversation: Conversation): Promise<void>;
}

export type { ChatStore, Message, Conversation };
