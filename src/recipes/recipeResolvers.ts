import { assembleMap } from '../helpers/assembleMap';

// TODO: eventually move all model calls to separate file where try-catchs and other things can be implemented

export const recipeResolvers = {
  Query: {
    recipe: async (_, { id }, { models }) => {
      return models.recipe.findById(id);
    },
    recipes: async (_, __, { models }) => {
      return models.recipe.find();
    },
    unapprovedRecipe: async (_, { id }, { models }) => {
      return models.newRecipe.findById(id);
    },
    unapprovedRecipes: async (_, __, { models }) => {
      return models.newRecipe.find();
    },
  },
  Mutation: {
    delete: async (_, { id }, { models }) => {
      return models.recipe.findByIdAndDelete(id);
    },
    reject: async (_, { id }, { models }) => {
      return models.newRecipe.findByIdAndDelete(id);
    },
    rate: (_, args, { dataSources }) => {
      const newMap = assembleMap(args.ratersKeys, args.ratersValues);
      const recipeInfo = {
        _id: args.id,
        raters: newMap,
      };
      return dataSources.recipeAPI.rateRecipe(recipeInfo);
    },
    favorite: (_, args, { dataSources }) => {
      const recipeInfo = {
        _id: args.id,
        favoriters: args.favoriters,
      };
      return dataSources.recipeAPI.favoriteRecipe(recipeInfo);
    },
    update: (_, args, { dataSources }) => {
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
    submit: (_, args, { dataSources }) => {
      const newRecipe = args.recipe;
      newRecipe.nutritionValues = { ...newRecipe.nutrition };
      delete newRecipe.nutrition;

      return dataSources.recipeAPI.submitForApproval(newRecipe);
    },
    add: (_, args, { dataSources }) => {
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
