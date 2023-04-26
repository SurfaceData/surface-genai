import { useState } from 'react';
import { Container, Spinner } from '@chakra-ui/react';
import { Form, TextField } from '@redwoodjs/forms';
import { useMutation } from '@redwoodjs/web';

import { LabeledInput, Button } from '@surfacedata/sd-components';

import Message from 'src/components/Message';

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
  const [allMessages, setAllMessages] = useState([]);
  const [chat, { data: conversation, loading }] = useMutation(CHAT, {
    onCompleted: (data) => {
      const { messages, requestId } = data.chat;
      console.log(messages);
      console.log(data.chat);
      setAllMessages((oldMessages) => [
        ...oldMessages,
        ...messages.map(({ source, content }) => ({
          source,
          content,
          requestId,
        })),
      ]);
    },
  });
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
        {allMessages.map(({ source, content, requestId }, i) => (
          <Message key={i} source={source} id={requestId}>
            {content}
          </Message>
        ))}
      </div>
    </Container>
  );
};

export default ConversationForm;
