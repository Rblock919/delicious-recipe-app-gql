import { gql } from 'apollo-server';

export const commentTypes = gql`
  type Comment {
    _id: ID!
    author: User!
    createdAt: String!
    body: String!
    recipe: Recipe!
  }
  extend type Query {
    recipeComments(recipeId: ID!): [Comment]!
    userComments(userId: ID): [Comment]!
  }
  extend type Mutation {
    createComment(input: CommentInput!): Comment!
    deleteComment(id: ID!): String!
  }
`;
