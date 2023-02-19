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

  /**
   * Return a single prompt that matches {@code label} and {@code variant}
   */
  getPromptsByLabelAndVariant: (
    label: string,
    variant: string
  ) => Promise<Prompt>;

  saveInteraction: (
    promptId: number,
    query: string,
    results: GenerateResult[],
    model: string,
    externalId: string
  ) => Promise<number>;
}
