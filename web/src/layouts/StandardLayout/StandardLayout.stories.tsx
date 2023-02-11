import type { ComponentMeta, ComponentStory } from '@storybook/react'

import StandardLayout from './StandardLayout'

export const generated: ComponentStory<typeof StandardLayout> = (args) => {
  return <StandardLayout {...args} />
}

export default {
  title: 'Layouts/StandardLayout',
  component: StandardLayout,
} as ComponentMeta<typeof StandardLayout>
