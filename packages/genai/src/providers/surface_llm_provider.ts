import type {
  GenerateProviderConfig,
  GenerateRequest,
  GenerateResult,
} from "src/providers/provider";
import { GenerateProvider } from "src/providers/provider";

class SurfaceLLMProvider extends GenerateProvider {
  constructor(config: GenerateProviderConfig) {
    super(config);
  }

  async generate(request: GenerateRequest) {
    const response = await fetch(`${this.url}/generate`, {
      method: "POST",
      body: JSON.stringify({
        prompt: request.text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    return response.map(({ completion }) => ({
      text: completion,
    }));
  }
}

export { SurfaceLLMProvider };
