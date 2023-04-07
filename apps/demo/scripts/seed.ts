import type { Prisma } from '@prisma/client';
import { db } from 'api/src/lib/db';

export default async () => {
  try {
    await db.prompt.createMany({
      data: [
        {
          label: 'raven_full',
          variant: 'prod',
          template: `Below is an instruction that describes a task, paired with an input that provides further context. Write a response that appropriately completes the request.

# Instruction:
{{instruction}}

# Input:
{{input}}

# Response:
`,
        },
        {
          label: 'raven_simple',
          variant: 'prod',
          template: `Below is an instruction that describes a task. Write a response that appropriately completes the request.

# Instruction:
{{instruction}}

# Response:
`,
        },
        {
          label: 'cat_namer',
          variant: 'prod',
          template: 'Give me {{ number_of_cats }} cats',
        },
        {
          label: 'cat_namer',
          variant: 'test',
          template: 'I want {{ number_of_cats }} cat names',
        },
      ],
    });
  } catch (error) {
    console.warn('Please define your seed data.');
    console.error(error);
  }
};
