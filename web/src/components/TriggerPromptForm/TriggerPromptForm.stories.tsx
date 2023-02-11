// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof TriggerPromptForm> = (args) => {
//   return <TriggerPromptForm {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import TriggerPromptForm from './TriggerPromptForm'

export const generated = () => {
  return <TriggerPromptForm />
}

export default {
  title: 'Components/TriggerPromptForm',
  component: TriggerPromptForm,
} as ComponentMeta<typeof TriggerPromptForm>
