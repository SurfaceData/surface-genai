import { render } from '@redwoodjs/testing/web'

import EvaluateMessageForm from './EvaluateMessageForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EvaluateMessageForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EvaluateMessageForm />)
    }).not.toThrow()
  })
})
