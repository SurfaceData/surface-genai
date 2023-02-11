import { render } from '@redwoodjs/testing/web'

import TriggerPromptForm from './TriggerPromptForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TriggerPromptForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TriggerPromptForm />)
    }).not.toThrow()
  })
})
