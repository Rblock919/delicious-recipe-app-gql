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
    comment(id: ID! @validMongoId): Comment! @authenticated
    recipeComments(recipeId: ID! @validMongoId): [Comment]! @authenticated
    userComments(userId: ID @validMongoId): [Comment]! @authenticated
  }
  extend type Mutation {
    createComment(input: CommentInput! @validMongoId): Comment! @authenticated
    deleteComment(id: ID! @validMongoId): String! @authenticated
    updateComment(input: UpdateCommentInput! @validMongoId): Comment!
      @authenticated
  }
`;
