interface Prompt {
  id: string;
  template: string;
  label: string;
  variant: string;
}

interface PromptStore {
  /**
   * Returns an array of prompts that match the requested {@code label}.
   */
  getPromptsByLabel(label: string): Promise<Prompt[]>;

  /**
   * Return a single prompt that matches {@code label} and {@code variant}
   */
  getPromptsByLabelAndVariant(label: string, variant: string): Promise<Prompt>;
}

export type { Prompt, PromptStore };
