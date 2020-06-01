import { gql } from 'apollo-server';

export const authTypes = gql`
  type Query {
    logout: String!
  }
  type Mutation {
    login(input: LoginInput!): AuthUser!
    register(input: LoginInput!): AuthUser!
  }
`;
