import { GenaiLog } from 'src/lib/genai_log/genai_log';
import Fake from 'src/lib/genai_log/fake_provider';
import GenaiLLM from 'src/lib/genai_log/genai_llm_provider';
import OpenAI from 'src/lib/genai_log/openai_provider';
import MultivariateExperimentManager from 'src/lib/genai_log/multivariate_experiment_manager';
import RandomExperimentManager from 'src/lib/genai_log/random_experiment_manager';
import { PrismaAdapter } from 'src/lib/genai_log/prisma_adapter';

import { db } from 'src/lib/db';

const genai = new GenaiLog({
  adapter: PrismaAdapter(db),
  experimentManager: MultivariateExperimentManager({
    experiments: [
      {
        name: 'on-cat-namer',
        promptCriteria: {
          onLabel: 'cat_namer',
        },
        options: [
          {
            name: 'prod',
            variant: 'prod',
            weight: 0.1,
          },

          {
            name: 'test',
            variant: 'test',
            weight: 0.9,
          },
        ],
      },
      {
        name: 'switch-llm-provider',
        providerCriteria: {
          onAny: true,
        },
        options: [
          {
            name: 'prod',
            provider: 'fake-fake1',
            weight: 0.1,
          },

          {
            name: 'test',
            provider: 'fake-fake2',
            weight: 0.9,
          },
        ],
      },
    ],
  }),
  providers: [
    Fake({ prefix: 'fake1' }),
    Fake({ prefix: 'fake2' }),
    /*
    GenaiLLM({ url: process.env.GENAI_URL, api_key: '' }),
    OpenAI({
      name: 'openai-davinci-003',
      url: process.env.OPENAI_URL,
      api_key: process.env.OPENAI_API_KEY,
      model: 'text-davinci-003',
    }),
    OpenAI({
      name: 'openai-ada-001',
      url: process.env.OPENAI_URL,
      api_key: process.env.OPENAI_API_KEY,
      model: 'text-ada-001',
    }),
    */
  ],
});

export { genai };
