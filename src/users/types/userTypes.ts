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
    users: [User]! @authorized @authenticated
    me: User! @authenticated
  }
  extend type Mutation {
    updateUsers(idArr: [String]!, isAdminArr: [Boolean]!): String!
      @authorized
      @authenticated
  }
`;

// TODO: test the above directives being on a line break
