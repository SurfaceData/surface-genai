import {
  SurfaceGenai,
  FakeProvider,
  GenerateProvider,
  MultivariateExperimentManager,
  PrismaInteractionLogger,
  PrismaPromptStore,
  RandomExperimentManager,
  SurfaceLLMProvider,
} from '@surface-data/genai';

import { db } from 'src/lib/db';

const genai = new SurfaceGenai({
  store: new PrismaPromptStore(db),
  interactionLogger: new PrismaInteractionLogger(db),
  providers: [
    new FakeProvider({ name: 'fake-fake1', prefix: '1' }),
    new FakeProvider({ name: 'fake-fake2', prefix: '2' }),
    new SurfaceLLMProvider({
      name: 'surface-llm',
      url: process.env.GENAI_URL,
      api_key: '',
    }),
  ],
  experimentManager: new MultivariateExperimentManager({
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
});

export { genai };
