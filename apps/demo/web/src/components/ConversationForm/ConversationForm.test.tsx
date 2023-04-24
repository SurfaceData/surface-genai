import { render } from '@redwoodjs/testing/web'

import ConversationForm from './ConversationForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ConversationForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ConversationForm />)
    }).not.toThrow()
  })
})
