import { gql } from 'apollo-server';

import { recipeInputs, recipeTypes } from './recipes';
import { testType } from './test/testType';

const rootTypes = gql`
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

export const typeDefs = [rootTypes, recipeTypes, recipeInputs, testType];
