import { authResolvers } from './auth';
import { recipeResolvers } from './recipes';
import { userResolvers } from './users';

export const resolvers = [authResolvers, recipeResolvers, userResolvers];
