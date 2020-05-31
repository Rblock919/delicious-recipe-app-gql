import { gql } from 'apollo-server';

export const authTypes = gql`
  directive @authenticated on FIELD_DEFINITION
  directive @authorized on FIELD_DEFINITION
  type Query {
    logout: String!
  }
  type Mutation {
    login(input: LoginInput!): AuthUser!
    register(input: LoginInput!): AuthUser!
  }
`;
