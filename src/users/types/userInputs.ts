import { gql } from 'apollo-server';

export const userInputs = gql`
  input UpdateUserInput {
    userId: ID!
    isAdmin: Boolean!
  }
`;
