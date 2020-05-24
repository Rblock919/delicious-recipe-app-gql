import { gql } from 'apollo-server';

export const userTypes = gql`
  type User {
    id: ID
    username: String!
    password: String
    isAdmin: Boolean!
  }
  type AuthUser {
    user: User
    token: String
  }
  extend type Query {
    users: [User]!
    me: User!
  }
  extend type Mutation {
    updateUsers(idArr: [String]!, isAdminArr: [Boolean]!): String!
  }
`;
