export const schema = gql`
  input EvaluateRequest {
    requestId: String!
    interactionType: String!
    evalType: String!
    rating: String!
  }

  type EvaluateResponse {
    id: String!
  }

  type Mutation {
    evaluate(input: EvaluateRequest!): EvaluateResponse! @skipAuth
  }
`;
