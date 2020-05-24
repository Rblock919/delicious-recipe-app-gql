import { gql } from 'apollo-server';

export const authInputs = gql`
  input LoginInput {
    username: String!
    password: String!
  }
`;
