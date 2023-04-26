import { useState } from 'react';
import { Box, Container, Spinner } from '@chakra-ui/react';
import { Form, Label, RadioField } from '@redwoodjs/forms';
import { useMutation } from '@redwoodjs/web';

import { Button } from '@surfacedata/sd-components';

const EVALUATE = gql`
  mutation EvaluateMutation($input: EvaluateRequest!) {
    evaluate(input: $input) {
      id
    }
  }
`;

const EvaluateMessageForm = ({ requestId, interactionType }) => {
  const [evaluate] = useMutation(EVALUATE, {
    onCompleted: (data) => {
      console.log('done');
    },
  });
  const onSubmit = (data) => {
    evaluate({
      variables: {
        input: {
          requestId,
          interactionType,
          evalType: 'rating',
          rating: data.rating,
        },
      },
    });
  };
  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Box display="flex" justifyContent="space-around">
          <Box display="flex" gap="1">
            <Label htmlFor="good">Good</Label>
            <RadioField id="good" name="rating" value="good" label="Good" />
          </Box>

          <Box display="flex" gap="1">
            <Label htmlFor="bad">Bad</Label>
            <RadioField id="bad" name="rating" value="bad" label="Bad" />
          </Box>
        </Box>
        <Button type="submit">done</Button>
      </Form>
    </Container>
  );
};

export default EvaluateMessageForm;
