import { gql } from 'apollo-server';

// TODO: update types for dates?
export const commentTypes = gql`
  type Comment {
    _id: ID!
    author: User!
    createdAt: String!
    body: String!
    recipe: Recipe!
    updatedAt: String
    edited: Boolean!
  }
  extend type Query {
    comment(id: ID!): Comment!
    recipeComments(recipeId: ID!): [Comment]!
    userComments(userId: ID): [Comment]!
  }
  extend type Mutation {
    createComment(input: CommentInput!): Comment!
    deleteComment(id: ID!): String!
    updateComment(input: UpdateCommentInput!): Comment!
  }
`;
