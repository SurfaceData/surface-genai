import { Container, Spinner } from '@chakra-ui/react';
import { Form, TextField } from '@redwoodjs/forms';
import { useMutation } from '@redwoodjs/web';

import { LabeledInput, Button } from '@surfacedata/sd-components';

const CHAT = gql`
  mutation ChatMutation($input: ChatRequest!) {
    chat(input: $input) {
      id
      requestId
      messages {
        source
        content
      }
    }
  }
`;

const ConversationForm = ({ chatId }) => {
  const [chat, { data: conversation, loading }] = useMutation(CHAT);
  const onSubmit = (data) => {
    chat({
      variables: {
        input: {
          id: chatId,
          query: data.query,
        },
      },
    });
  };
  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <LabeledInput name="query" label="Input" as={TextField} />
        <Button type="submit">Chat</Button>
      </Form>
      <div>
        {loading && <Spinner />}
        {conversation && conversation?.chat?.requestId && (
          <span>{conversation.chat.requestId}</span>
        )}
        {conversation &&
          conversation?.chat?.messages?.map(({ source, content }, i) => (
            <div key={i}>
              {source}: {content}
            </div>
          ))}
      </div>
    </Container>
  );
};

export default ConversationForm;
