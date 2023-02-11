import { Liquid } from 'liquidjs'

import { db } from 'src/lib/db'

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
  const generationResults = await fetch(
    `${process.env.GENAI_URL}/generate?prompt=${prompt}`
  ).then((res) => res.json())
  return {
    results: generationResults.map((result) => ({
      output: result.completion,
    })),
  }
}
