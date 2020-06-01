import { gql } from 'apollo-server';

export const userTypes = gql`
  type User {
    _id: ID
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
    updateUsers(input: [UpdateUserInput!]! @validMongoId): String!
      @authorized
      @authenticated
  }
`;
