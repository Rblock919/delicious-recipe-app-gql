import { gql } from 'apollo-server';

import { recipeInputs, recipeTypes } from './recipes';
import { userTypes } from './users';
import { testType } from './test/testType';

const rootTypes = gql`
  type Query {
    signOut: String!
  }
  type Mutation {
    signIn(username: String!, password: String!): AuthUser!
    signUp(username: String!, password: String!): AuthUser!
  }
`;

export const typeDefs = [
  rootTypes,
  recipeTypes,
  userTypes,
  recipeInputs,
  testType,
];
