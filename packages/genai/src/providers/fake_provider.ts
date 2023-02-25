import type {
  GenerateProviderConfig,
  GenerateRequest,
  GenerateResult,
} from "src/providers/provider";
import { GenerateProvider } from "src/providers/provider";

interface FakeProviderConfig extends GenerateProviderConfig {
  prefix: string;
}

class FakeProvider extends GenerateProvider {
  readonly prefix: string;

  constructor(config: FakeProviderConfig) {
    super(config);
    this.prefix = config.prefix;
  }

  async generate(request: GenerateRequest) {
    return [
      {
        text: `${this.prefix}-${request.text}`,
      },
    ];
  }
}

export type { FakeProviderConfig };
export { FakeProvider };
