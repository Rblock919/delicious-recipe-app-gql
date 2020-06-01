import { UserInputError } from 'apollo-server';
// import { assembleMap } from '../helpers/assembleMap';

// TODO: eventually move all model calls to separate file where try-catches and other things can be implemented

export const recipeResolvers = {
  Query: {
    recipe: async (_, { id }, { loaders }) => {
      return loaders.Recipe.load(id);
    },
    recipes: async (_, __, { models }) => {
      return models.Recipe.find();
    },
    unapprovedRecipe: async (_, { id }, { loaders }) => {
      return loaders.NewRecipe.load(id);
    },
    unapprovedRecipes: async (_, __, { models }) => {
      return models.NewRecipe.find();
    },
  },
  Mutation: {
    // TODO: improve the below two methods with try-catches
    delete: async (_, { id }, { models }) => {
      await models.Recipe.findByIdAndDelete(id);
      return 'Success';
    },
    reject: async (_, { id }, { models }) => {
      await models.NewRecipe.findByIdAndDelete(id);
      return 'Success';
    },
    // TODO: improve by using try catches and returning better errors to client
    rate: async (_, { input }, { models, user }) => {
      const { recipeId, rating } = input;

      const recipe = await models.Recipe.findById(recipeId);
      const { raters } = recipe;

      raters.set(user._id, rating);

      await models.Recipe.updateOne(
        { _id: recipeId },
        { $set: { raters } },
        { upsert: true, new: true }
      );

      return 'Success';
    },
    // TODO: improve by using try catches and returning better errors to client
    favorite: async (_, { id }, { models, user }) => {
      const recipe = await models.Recipe.findById(id);
      const { favoriters } = recipe;
      let newFavoriters: string[];

      if (favoriters.includes(user._id)) {
        newFavoriters = favoriters.filter((x: string) => x !== user._id);
      } else {
        newFavoriters = favoriters;
        newFavoriters.push(user._id);
      }

      await models.Recipe.updateOne(
        { _id: id },
        { $set: { favoriters: newFavoriters } },
        { upsert: true, new: true }
      );
      return 'Success';
    },
    update: async (_, { input }, { models }) => {
      const { recipe, recipeId } = input;

      const updatedData = {
        title: recipe.title,
        producer: recipe.producer,
        ingredients: recipe.ingredients,
        steps: recipe.steps,
        imgDir: recipe.imgDir,
        // TODO: fix the discrepancy in the angular forms between nutrition & nutritionValues
        nutritionValues: recipe.nutrition,
      };

      return models.Recipe.findByIdAndUpdate(
        recipeId,
        { $set: updatedData },
        {
          new: true,
        }
      );
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
    comments: ({ comments }, _, { models }) => {
      // console.log({ comments });
      return models.Comment.find({ _id: { $in: comments } });
    },
  },
};
