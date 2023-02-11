import { Container } from '@chakra-ui/react'
import { Form, NumberField } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'

import { LabeledNumberInput, Button } from '@surfacedata/sd-components'

const GENERATE = gql`
  mutation GenerateMutation($input: GenerateRequest!) {
    generate(input: $input) {
      results {
        output
      }
    }
  }
`

const TriggerPromptForm = () => {
  const [generate] = useMutation(GENERATE)
  const onSubmit = (data) => {
    generate({
      variables: {
        input: {
          fields: JSON.stringify(data),
        },
      },
    })
  }
  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <LabeledNumberInput
          name="number_of_cats"
          label="Number Of Cats"
          as={NumberField}
        />
        <Button type="submit">Generate</Button>
      </Form>
    </Container>
  )
}

export default TriggerPromptForm
