import { render } from '@redwoodjs/testing/web'

import StartChatForm from './StartChatForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('StartChatForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StartChatForm />)
    }).not.toThrow()
  })
})
