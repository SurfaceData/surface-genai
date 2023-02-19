import type { Prisma } from '@prisma/client';
import { db } from 'api/src/lib/db';

export default async () => {
  try {
    await db.prompt.createMany({
      data: [
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
