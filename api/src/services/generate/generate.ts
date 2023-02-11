import { Liquid } from 'liquidjs'

import { db } from 'src/lib/db'
import { genai } from 'src/lib/genai'

const engine = new Liquid()

export const generate = async ({ input }) => {
  const { fields } = input
  const templateFields = JSON.parse(fields)

  const promptOptions = await db.prompt.findMany({
    where: { label: 'cat_namer' },
    select: {
      variant: true,
      template: true,
    },
  })
  var index = Math.floor(Math.random() * promptOptions.length)
  const { variant, template } = promptOptions[index]
  const tpl = engine.parse(template)
  const prompt = await engine.render(tpl, templateFields)
  const results = await genai.generate(prompt)
  console.log(results)
  return {
    results: results.map(({ completion }) => ({
      output: completion,
    })),
  }
}
