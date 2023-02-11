import { GenaiLog } from 'src/lib/genai_log/genai_log'
import GenaiLLM from 'src/lib/genai_log/genai_llm_provider'
import OpenAI from 'src/lib/genai_log/openai_provider'

const genai = new GenaiLog({
  providers: [
    /*
    GenaiLLM({ url: process.env.GENAI_URL, api_key: '' }),
    OpenAI({
      name: 'openai-davinci-003',
      url: process.env.OPENAI_URL,
      api_key: process.env.OPENAI_API_KEY,
      model: 'text-davinci-003',
    }),
    */
    OpenAI({
      name: 'openai-ada-001',
      url: process.env.OPENAI_URL,
      api_key: process.env.OPENAI_API_KEY,
      model: 'text-ada-001',
    }),
  ],
})

export { genai }
