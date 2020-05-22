import { rootTypes } from './rootTypes';
import { recipeInputs, recipeTypes } from './recipes';
import { testType } from './test/testType';

export const typeDefs = [rootTypes, recipeTypes, recipeInputs, testType];
