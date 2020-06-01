import { authResolvers } from './auth';
import { recipeResolvers } from './recipes';
import { userResolvers } from './users';
import { commentResolvers } from './comments';

export const resolvers = [
  authResolvers,
  recipeResolvers,
  userResolvers,
  commentResolvers,
];
