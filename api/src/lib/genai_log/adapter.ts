import type { GenerateResult } from 'src/lib/genai_log/provider';

export interface Prompt {
  label: string;
  variant: string;
  template: string;
}

export interface Adapter {
  /**
   * Returns an array of prompts that match the requested {@code label}.
   */
  getPromptsByLabel: (label: string) => Promise<Prompt[]>;

  saveInteraction: (
    promptId: number,
    query: string,
    results: GenerateResult[],
    model: string
  ) => Promise<number>;
}
