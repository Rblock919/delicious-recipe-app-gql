import { recipeInputs, recipeTypes } from './recipes';
import { userTypes, userInputs } from './users';
import { authTypes, authInputs } from './auth';
import { commentInputs, commentTypes } from './comments';

export const typeDefs = [
  authTypes,
  authInputs,
  recipeTypes,
  recipeInputs,
  userTypes,
  userInputs,
  commentTypes,
  commentInputs,
];
