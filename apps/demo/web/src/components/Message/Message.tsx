import {
  Avatar,
  Box,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';

import EvaluateMessageForm from 'src/components/EvaluateMessageForm';

const Rateable = ({ children, popoverChildren }) => {
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>{popoverChildren}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

const AssistantMessage = ({ id, children }) => {
  const evaluateForm = (
    <EvaluateMessageForm requestId={id} interactionType="chat" />
  );
  return (
    <Rateable popoverChildren={evaluateForm}>
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
        </div>
      </Box>
    </Rateable>
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
