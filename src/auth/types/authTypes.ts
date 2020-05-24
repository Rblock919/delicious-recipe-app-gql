import { gql } from 'apollo-server';

export const authTypes = gql`
  type Query {
    signOut: String!
  }
  type Mutation {
    signIn(input: LoginInput!): AuthUser!
    signUp(input: LoginInput!): AuthUser!
  }
`;
