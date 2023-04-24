import { Container, Spinner } from '@chakra-ui/react';
import { Form, TextField } from '@redwoodjs/forms';
import { useMutation } from '@redwoodjs/web';

import { LabeledInput, Button } from '@surfacedata/sd-components';

const START_CHAT = gql`
  mutation StartChatMutation($input: StartChatRequest!) {
    startChat(input: $input) {
      id
      messages {
        source
        content
      }
    }
  }
`;

const ConversationForm = () => {
  const [startChat, { data: conversation, loading }] = useMutation(START_CHAT);
  const onSubmit = (data) => {
    startChat({
      variables: {
        input: {
          label: 'simple_chat',
          fields: JSON.stringify(data),
        },
      },
    });
  };
  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <LabeledInput name="input_text" label="Input" as={TextField} />
        <Button type="submit">Chat</Button>
      </Form>
      <div>
        {loading && <Spinner />}
        {conversation &&
          conversation?.startChat?.messages?.map(({ source, content }, i) => (
            <div key={i}>
              {source}: {content}
            </div>
          ))}
      </div>
    </Container>
  );
};

export default ConversationForm;
