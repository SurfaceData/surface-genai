import { GenaiLog } from 'src/lib/genai_log/genai_log'
import GenaiLLM from 'src/lib/genai_log/genai_llm_provider'

const genai = new GenaiLog({
  providers: [GenaiLLM({ url: process.env.GENAI_URL, api_key: '' })],
})

export { genai }
