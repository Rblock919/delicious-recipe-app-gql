import { assembleMap } from '../helpers/assembleMap';
import { recipeData } from '../data/seed';

export const recipeResolvers = {
  Query: {
    recipe: (root, { id }, { dataSources }) =>
      dataSources.recipeAPI.getRecipe(id),
    recipes: (root, args, { dataSources }) => {
      return recipeData;
      // dataSources.recipeAPI.getAllRecipes(),
    },
    unapprovedRecipe: (root, { id }, { dataSources }) =>
      dataSources.recipeAPI.getUnapprovedRecipe(id),
    unapprovedRecipes: (root, args, { dataSources }) =>
      dataSources.recipeAPI.getAllUnapprovedRecipes(),
  },
  Mutation: {
    delete: (root, { id }, { dataSources }) =>
      dataSources.recipeAPI.deleteRecipe(id),
    reject: (root, { id }, { dataSources }) =>
      dataSources.recipeAPI.rejectRecipe(id),
    rate: (root, args, { dataSources }) => {
      const newMap = assembleMap(args.ratersKeys, args.ratersValues);
      const recipeInfo = {
        _id: args.id,
        raters: newMap,
      };
      return dataSources.recipeAPI.rateRecipe(recipeInfo);
    },
    favorite: (root, args, { dataSources }) => {
      const recipeInfo = {
        _id: args.id,
        favoriters: args.favoriters,
      };
      return dataSources.recipeAPI.favoriteRecipe(recipeInfo);
    },
    update: (root, args, { dataSources }) => {
      const updatedRecipe = args.recipe;
      // TODO: fix the discrepancy in the angular forms between nutrition & nutritionValues
      updatedRecipe.nutritionValues = { ...updatedRecipe.nutrition };
      delete updatedRecipe.nutrition;

      updatedRecipe.raters = assembleMap(
        updatedRecipe.raters.keys,
        updatedRecipe.raters.values
      );
      updatedRecipe._id = args.recipeId;

      return dataSources.recipeAPI.updateRecipe(updatedRecipe);
    },
    submit: (root, args, { dataSources }) => {
      const newRecipe = args.recipe;
      newRecipe.nutritionValues = { ...newRecipe.nutrition };
      delete newRecipe.nutrition;

      return dataSources.recipeAPI.submitForApproval(newRecipe);
    },
    add: (root, args, { dataSources }) => {
      const { recipe } = args;
      recipe.nutritionValues = { ...recipe.nutrition };
      delete recipe.nutrition;

      return dataSources.recipeAPI.addRecipe(recipe, args.approvalId);
    },
  },
  Recipe: {
    // have to do this since graphql doesn't natively support maps yet -.-
    raters: ({ raters }: { raters: Map<string, string> }) => {
      // TODO: clean this function up once DB connection is back
      const ratersIds = [] as string[];
      const ratersValues = [] as string[];
      Object.keys(raters).forEach(key => {
        ratersIds.push(key);
      });
      Object.values(raters).forEach(value => {
        ratersValues.push(value);
      });
      return {
        keys: ratersIds,
        values: ratersValues,
      };
    },
  },
};
