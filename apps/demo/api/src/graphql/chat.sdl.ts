export const schema = gql`
  input StartChatRequest {
    fields: String!
    label: String!
  }

  type ChatMessage {
    source: String!
    content: String!
  }

  type ChatConversation {
    id: String!
    messages: [ChatMessage]
  }

  type Mutation {
    startChat(input: StartChatRequest!): ChatConversation! @skipAuth
  }
`;
