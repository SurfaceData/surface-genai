import { GenaiLog } from 'src/lib/genai_log/genai_log'
import { GenaiLLMProvider } from 'src/lib/genai_log/genai_llm_provider'

const genai = new GenaiLog([new GenaiLLMProvider(process.env.GENAI_URL, '')])

export { genai }
