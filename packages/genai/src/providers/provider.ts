interface GenerateRequest {
  text: string;
  max_tokens?: number;
  number_of_completions?: number;
}

interface GenerateResult {
  text: string;
}

interface GenerateProvider {
  readonly name: string;

  generate(request: GenerateRequest): Promise<GenerateResult[]>;
}

export type { GenerateProvider, GenerateRequest, GenerateResult };
