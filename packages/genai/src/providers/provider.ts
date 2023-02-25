interface GenerateRequest {
  text: string;
  max_tokens?: number;
  number_of_completions?: number;
}

interface GenerateResult {
  text: string;
}

class GenerateProviderConfig {
  name: string;
  url?: string;
  api_key?: string;
}

abstract class GenerateProvider {
  readonly name: string;
  protected readonly url: string;
  protected readonly api_key: string;

  constructor(config: GenerateProviderConfig) {
    this.name = config.name;
    this.url = config.url || "";
    this.api_key = config.api_key || "";
  }

  abstract generate(request: GenerateRequest): Promise<GenerateResult[]>;
}

export { GenerateProvider };
export type { GenerateProviderConfig, GenerateRequest, GenerateResult };
