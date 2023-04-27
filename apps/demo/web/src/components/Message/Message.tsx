import { Avatar, Box, IconButton } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';

import EvaluateMessageForm from 'src/components/EvaluateMessageForm';

const AssistantMessage = ({ id, children }) => {
  return (
    <Box
      bg="gray.100"
      borderRadius="5"
      display="flex"
      justifyContent="start"
      gap="2"
      p="2"
    >
      <Avatar name="Assistant" />
      <div>
        <ReactMarkdown>{children}</ReactMarkdown>
        <EvaluateMessageForm requestId={id} interactionType="chat" />
      </div>
    </Box>
  );
};

const UserMessage = ({ id, children }) => {
  return (
    <Box
      borderRadius="5"
      display="flex"
      justifyContent="space-between"
      gap="2"
      p="2"
    >
      <div>
        <ReactMarkdown>{children}</ReactMarkdown>
      </div>
      <Avatar name="user" />
    </Box>
  );
};
const Message = ({ id, source, children }) => {
  if (source === 'assistant') {
    return <AssistantMessage id={id}>{children}</AssistantMessage>;
  }
  return <UserMessage id={id}>{children}</UserMessage>;
};

export default Message;
