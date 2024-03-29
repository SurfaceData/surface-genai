import { Container, Spinner } from '@chakra-ui/react';
import { Form, TextField } from '@redwoodjs/forms';
import { useMutation } from '@redwoodjs/web';

import { LabeledInput, Button } from '@surfacedata/sd-components';

const GENERATE = gql`
  mutation GenerateMutation($input: GenerateRequest!) {
    generate(input: $input) {
      results {
        text
      }
    }
  }
`;

const TriggerPromptForm = () => {
  const [generate, { data: generateResults, loading }] = useMutation(GENERATE);
  const onSubmit = (data) => {
    generate({
      variables: {
        input: {
          label: 'simple',
          fields: JSON.stringify(data),
        },
      },
    });
  };
  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <LabeledInput name="input_text" label="Input" as={TextField} />
        <Button type="submit">Generate</Button>
      </Form>
      <div>
        {loading && <Spinner />}
        {generateResults &&
          generateResults.generate.results.map(({ text }, i) => (
            <div key={i}>{text}</div>
          ))}
      </div>
    </Container>
  );
};

export default TriggerPromptForm;
