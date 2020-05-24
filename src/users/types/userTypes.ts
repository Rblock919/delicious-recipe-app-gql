// TODO: implement
import { gql } from 'apollo-server';

export const userTypes = gql`
  extend type Query {
    users: [User]!
    me: User!
  }
  extend type Mutation {
    updateUsers(idArr: [String]!, isAdminArr: [Boolean]!): String!
  }
`;
