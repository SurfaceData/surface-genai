export const schema = gql`
  input GenerateRequest {
    fields: String!
  }

  type GenerateResults {
    results: [GenerateResult]
  }

  type GenerateResult {
    output: String!
  }

  type Mutation {
    generate(input: GenerateRequest!): GenerateResults! @skipAuth
  }
`
