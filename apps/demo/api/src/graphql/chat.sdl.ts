export const schema = gql`
  input StartChatRequest {
    fields: String!
    label: String!
  }

  input ChatRequest {
    id: String!
    query: String!
  }

  type ChatMessage {
    source: String!
    content: String!
  }

  type ChatConversation {
    id: String!
    requestId: String!
    messages: [ChatMessage]
  }

  type Mutation {
    startChat(input: StartChatRequest!): ChatConversation! @skipAuth
    chat(input: ChatRequest!): ChatConversation! @skipAuth
  }
`;
