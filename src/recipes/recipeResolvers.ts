// import { UserInputError } from 'apollo-server';

export const recipeResolvers = {
  Query: {
    recipe: async (_, { id }, { services, loaders }) => {
      return services.Recipe.getRecipeById(id, loaders.Recipe);
    },
    recipes: async (_, __, { services, models }) => {
      return services.Recipe.getAllRecipes(models.Recipe);
    },
    unapprovedRecipe: async (_, { id }, { services, loaders }) => {
      return services.Recipe.getUnapprovedRecipeById(id, loaders.NewRecipe);
    },
    unapprovedRecipes: async (_, __, { services, models }) => {
      return services.Recipe.getAllUnapprovedRecipes(models.NewRecipe);
    },
  },
  Mutation: {
    delete: async (_, { id }, { services, models }) => {
      return services.Recipe.deleteRecipe(id, models.Recipe);
    },
    reject: async (_, { id }, { services, models }) => {
      return services.Recipe.rejectRecipe(id, models.NewRecipe);
    },
    // TODO: improve by using try catches and returning better errors to client
    rate: async (_, { input }, { services, models, user }) => {
      const { recipeId, rating } = input;
      return services.Recipe.rateRecipe(
        recipeId,
        rating,
        models.Recipe,
        user._id
      );

      // const recipe = await models.Recipe.findById(recipeId);
      // const { raters } = recipe;

      // raters.set(user._id, rating);

      // await models.Recipe.updateOne(
      //   { _id: recipeId },
      //   { $set: { raters } },
      //   { upsert: true, new: true }
      // );

      // return 'Success';
    },
    // TODO: improve by using try catches and returning better errors to client
    favorite: async (_, { id }, { services, models, user }) => {
      return services.Recipe.favoriteRecipe(id, models.Recipe, user._id);

      // const recipe = await models.Recipe.findById(id);
      // const { favoriters } = recipe;
      // let newFavoriters: string[];

      // if (favoriters.includes(user._id)) {
      //   newFavoriters = favoriters.filter((x: string) => x !== user._id);
      // } else {
      //   newFavoriters = favoriters;
      //   newFavoriters.push(user._id);
      // }

      // await models.Recipe.updateOne(
      //   { _id: id },
      //   { $set: { favoriters: newFavoriters } },
      //   { upsert: true, new: true }
      // );
      // return 'Success';
    },
    update: async (_, { input }, { services, models }) => {
      const { recipe, recipeId } = input;
      return services.Recipe.updateRecipe(recipe, recipeId, models.Recipe);

      // const updatedData = {
      //   title: recipe.title,
      //   producer: recipe.producer,
      //   ingredients: recipe.ingredients,
      //   steps: recipe.steps,
      //   imgDir: recipe.imgDir,
      //   // TODO: fix the discrepancy in the angular forms between nutrition & nutritionValues
      //   nutritionValues: recipe.nutrition,
      // };

      // return models.Recipe.findByIdAndUpdate(
      //   recipeId,
      //   { $set: updatedData },
      //   {
      //     new: true,
      //   }
      // );
    },
    submit: async (_, { input }, { services, models }) => {
      return services.Recipe.submitRecipeForApproval(input, models.NewRecipe);
      // const newRecipe = input;
      // newRecipe.nutritionValues = { ...newRecipe.nutrition };
      // delete newRecipe.nutrition;

      // const recipe = new models.NewRecipe(newRecipe);

      // // Since this value is an array in mongo it will autopopulate and therefor cannot implement reqruied at a db level
      // if (recipe.producer !== 'Blue Apron' && recipe.preCook.length === 0) {
      //   throw new UserInputError(
      //     'Home Chef & Hello Fresh Recipes Must Have a Precook Value'
      //   );
      // }

      // await recipe.save();

      // return 'Success';
    },
    // TODO: improve with try-catches and better error handling
    approve: async (_, { input }, { services, models }) => {
      const { approvalId, recipe } = input;
      return services.Recipe.approveRecipe(
        approvalId,
        recipe,
        models.Recipe,
        models.NewRecipe
      );

      // recipe.nutritionValues = { ...recipe.nutrition };
      // delete recipe.nutrition;

      // const newRecipe = new models.Recipe(recipe);

      // await newRecipe.save();
      // await models.NewRecipe.findByIdAndDelete(approvalId);

      // return newRecipe;
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
      return models.Comment.find({ _id: { $in: comments } });
    },
  },
};
