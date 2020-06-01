import { recipeInputs, recipeTypes } from './recipes';
import { userTypes, userInputs } from './users';
import { authTypes, authInputs } from './auth';
import { commentInputs, commentTypes } from './comments';
import { directiveTypes } from './directives';

export const typeDefs = [
  directiveTypes,
  authTypes,
  authInputs,
  recipeTypes,
  recipeInputs,
  userTypes,
  userInputs,
  commentTypes,
  commentInputs,
];
