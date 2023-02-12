export const schema = gql`
  input GenerateRequest {
    fields: String!
  }

  type GenerateResults {
    requestId: Int!
    results: [GenerateResult]
  }

  type GenerateResult {
    completion: String!
  }

  type Mutation {
    generate(input: GenerateRequest!): GenerateResults! @skipAuth
  }
`;
