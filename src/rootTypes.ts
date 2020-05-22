import { gql } from 'apollo-server';

export const rootTypes = gql`
  type Query {
    users: [User]!
    signOut: String!
    me: User!
  }
  type Mutation {
    signIn(username: String!, password: String!): AuthUser!
    signUp(username: String!, password: String!): AuthUser!
    updateUsers(idArr: [String]!, isAdminArr: [Boolean]!): String!
  }
`;
