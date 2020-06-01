import { gql } from 'apollo-server';

export const commentTypes = gql`
  type Comment {
    _id: ID!
    author: User!
    createdAt: String! @formatDate
    body: String!
    recipe: Recipe!
    updatedAt: String @formatDate
    edited: Boolean!
  }
  extend type Query {
    comment(id: ID! @validMongoId): Comment!
    recipeComments(recipeId: ID! @validMongoId): [Comment]!
    userComments(userId: ID @validMongoId): [Comment]!
  }
  extend type Mutation {
    createComment(input: CommentInput! @validMongoId): Comment!
    deleteComment(id: ID! @validMongoId): String!
    updateComment(input: UpdateCommentInput! @validMongoId): Comment!
  }
`;
