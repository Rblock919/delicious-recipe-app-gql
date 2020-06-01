import { gql } from 'apollo-server';

export const commentInputs = gql`
  input CommentInput {
    body: String!
    recipeId: ID!
  }
  input UpdateCommentInput {
    id: ID!
    body: String!
  }
`;
