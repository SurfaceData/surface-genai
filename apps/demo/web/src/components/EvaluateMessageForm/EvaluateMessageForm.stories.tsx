// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof EvaluateMessageForm> = (args) => {
//   return <EvaluateMessageForm {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import EvaluateMessageForm from './EvaluateMessageForm'

export const generated = () => {
  return <EvaluateMessageForm />
}

export default {
  title: 'Components/EvaluateMessageForm',
  component: EvaluateMessageForm,
} as ComponentMeta<typeof EvaluateMessageForm>
