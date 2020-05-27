import { recipeInputs, recipeTypes } from './recipes';
import { userTypes, userInputs } from './users';
import { authTypes, authInputs } from './auth';

export const typeDefs = [
  authTypes,
  authInputs,
  recipeTypes,
  recipeInputs,
  userTypes,
  userInputs,
];
