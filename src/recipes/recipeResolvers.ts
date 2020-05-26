import { UserInputError } from 'apollo-server';
import { assembleMap } from '../helpers/assembleMap';

// TODO: eventually move all model calls to separate file where try-catches and other things can be implemented

export const recipeResolvers = {
  Query: {
    recipe: async (_, { id }, { models }) => {
      return models.Recipe.findById(id);
    },
    recipes: async (_, __, { models }) => {
      return models.Recipe.find();
    },
    unapprovedRecipe: async (_, { id }, { models }) => {
      return models.NewRecipe.findById(id);
    },
    unapprovedRecipes: async (_, __, { models }) => {
      return models.NewRecipe.find();
    },
  },
  Mutation: {
    delete: async (_, { id }, { models }) => {
      await models.Recipe.findByIdAndDelete(id);
      return 'Success';
    },
    reject: async (_, { id }, { models }) => {
      await models.NewRecipe.findByIdAndDelete(id);
      return 'Success';
    },
    // TODO: improve by using try catches and returning better errors to client
    // TODO: implement auth to make sure user exists
    rate: async (_, { input }, { models, user }) => {
      const { recipeId, rating } = input;

      const recipe = await models.Recipe.findById(recipeId);
      const { raters } = recipe;

      raters.set(user.id, rating);

      await models.Recipe.updateOne(
        { _id: recipeId },
        { $set: { raters } },
        { upsert: true, new: true }
      );

      return 'Success';
    },
    // TODO: improve by using try catches and returning better errors to client
    // TODO: implement auth to make sure user exists
    favorite: async (_, { id }, { models, user }) => {
      const recipe = await models.Recipe.findById(id);
      const { favoriters } = recipe;
      let newFavoriters: string[];

      if (favoriters.includes(user.id)) {
        newFavoriters = favoriters.filter((x: string) => x !== user.id);
      } else {
        newFavoriters = favoriters;
        newFavoriters.push(user.id);
      }

      await models.Recipe.updateOne(
        { _id: id },
        { $set: { favoriters: newFavoriters } },
        { upsert: true, new: true }
      );
      return 'Success';
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
    submit: async (_, { input }, { models }) => {
      const newRecipe = input;
      newRecipe.nutritionValues = { ...newRecipe.nutrition };
      delete newRecipe.nutrition;

      const recipe = new models.NewRecipe(newRecipe);

      // Since this value is an array in mongo it will autopopulate and therefor cannot implement reqruied at a db level
      if (recipe.producer !== 'Blue Apron' && recipe.preCook.length === 0) {
        throw new UserInputError(
          'Home Chef & Hello Fresh Recipes Must Have a Precook Value'
        );
      }

      await recipe.save();

      return 'Success';
    },
    // TODO: improve with try-catches and better error handling
    approve: async (_, { input }, { models }) => {
      const { approvalId, recipe } = input;

      recipe.nutritionValues = { ...recipe.nutrition };
      delete recipe.nutrition;

      const newRecipe = new models.Recipe(recipe);

      await newRecipe.save();
      await models.NewRecipe.findByIdAndDelete(approvalId);

      return newRecipe;
    },
  },
  Recipe: {
    // have to do this since graphql doesn't natively support maps yet -.-
    raters: ({ raters }: { raters: Map<string, number> }) => {
      return {
        keys: Array.from(raters.keys()),
        values: Array.from(raters.values()),
      };
    },
  },
};
