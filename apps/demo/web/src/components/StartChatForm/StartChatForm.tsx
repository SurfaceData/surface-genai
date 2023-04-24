import { Container, Spinner } from '@chakra-ui/react';
import { Form, TextField } from '@redwoodjs/forms';
import { useMutation } from '@redwoodjs/web';

import { LabeledInput, Button } from '@surfacedata/sd-components';

import ConversationForm from 'src/components/ConversationForm';

const START_CHAT = gql`
  mutation StartChatMutation($input: StartChatRequest!) {
    startChat(input: $input) {
      id
      requestId
      messages {
        source
        content
      }
    }
  }
`;

const StartChatForm = () => {
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
        <Button type="submit">New Chat</Button>
      </Form>
      <div>
        {loading && <Spinner />}
        {conversation && conversation?.startChat && (
          <ConversationForm chatId={conversation.startChat.id} />
        )}
      </div>
    </Container>
  );
};

export default StartChatForm;
