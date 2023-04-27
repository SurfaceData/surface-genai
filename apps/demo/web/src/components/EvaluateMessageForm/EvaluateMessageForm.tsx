import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import { useState } from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import { useMutation } from '@redwoodjs/web';

const EVALUATE = gql`
  mutation EvaluateMutation($input: EvaluateRequest!) {
    evaluate(input: $input) {
      id
    }
  }
`;

const EvaluateMessageForm = ({ requestId, interactionType }) => {
  const [selected, setSelected] = useState('');
  const [evaluate] = useMutation(EVALUATE, {
    onCompleted: (data) => {
      console.log('done');
    },
  });
  const submitEvaluation = (target) => {
    evaluate({
      variables: {
        input: {
          requestId,
          interactionType,
          evalType: 'rating',
          rating: target,
        },
      },
    });
    setSelected(target);
  };

  return (
    <Box display="flex" justifyContent="end" gap="2">
      <IconButton
        onClick={() => submitEvaluation('good')}
        isActive={selected === 'good'}
        aria-label="Vote Up"
        icon={<ArrowBigUp />}
      />
      <IconButton
        onClick={() => submitEvaluation('bad')}
        isActive={selected === 'bad'}
        aria-label="Vote Down"
        icon={<ArrowBigDown />}
      />
    </Box>
  );
};

export default EvaluateMessageForm;
