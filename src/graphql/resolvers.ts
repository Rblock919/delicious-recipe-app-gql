//const assembleMap = require('../functions/assembleMap');
import assembleMap from '../functions/assembleMap';

const resolvers = {
  Query: {
    users: (root: any, args: any, { dataSources }: { dataSources: any }) =>
      dataSources.recipeAPI.getAllUsers(),
    recipe: (
      root: any,
      { id }: { id: string },
      { dataSources }: { dataSources: any }
    ) => dataSources.recipeAPI.getRecipe(id),
    recipes: (root: any, args: any, { dataSources }: { dataSources: any }) =>
      dataSources.recipeAPI.getAllRecipes(),
    unapprovedRecipe: (
      root: any,
      { id }: { id: string },
      { dataSources }: { dataSources: any }
    ) => dataSources.recipeAPI.getUnapprovedRecipe(id),
    unapprovedRecipes: (
      root: any,
      args: any,
      { dataSources }: { dataSources: any }
    ) => dataSources.recipeAPI.getAllUnapprovedRecipes(),
    signOut: (root: any, args: any, { dataSources }: { dataSources: any }) =>
      dataSources.recipeAPI.signOut(),
    getUserData: (
      root: any,
      args: any,
      { dataSources }: { dataSources: any }
    ) => dataSources.recipeAPI.getUserData(),
  },
  Mutation: {
    deleteRecipe: (
      root: any,
      { id }: { id: string },
      { dataSources }: { dataSources: any }
    ) => dataSources.recipeAPI.deleteRecipe(id),
    updateUsers: (
      root: any,
      args: any,
      { dataSources }: { dataSources: any }
    ) => {
      const ids = args['idArr'];
      const isAdmins = args['isAdminArr'];
      const users = [];

      let counter = 0;
      for (const entry of ids) {
        users.push({
          _id: ids[counter],
          isAdmin: isAdmins[counter],
        });
        counter++;
      }

      return dataSources.recipeAPI.updateUsers(users);
    },
    rejectRecipe: (
      root: any,
      { id }: { id: string },
      { dataSources }: { dataSources: any }
    ) => dataSources.recipeAPI.rejectRecipe(id),
    rateRecipe: (
      root: any,
      args: any,
      { dataSources }: { dataSources: any }
    ) => {
      const newMap = assembleMap(args.ratersKeys, args.ratersValues);
      const recipeInfo = {
        _id: args.id,
        raters: newMap,
      };
      return dataSources.recipeAPI.rateRecipe(recipeInfo);
    },
    favoriteRecipe: (
      root: any,
      args: any,
      { dataSources }: { dataSources: any }
    ) => {
      const recipeInfo = {
        _id: args.id,
        favoriters: args.favoriters,
      };
      return dataSources.recipeAPI.favoriteRecipe(recipeInfo);
    },
    updateRecipe: (
      root: any,
      args: any,
      { dataSources }: { dataSources: any }
    ) => {
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
    submitForApproval: (
      root: any,
      args: any,
      { dataSources }: { dataSources: any }
    ) => {
      const newRecipe = args.recipe;
      newRecipe.nutritionValues = { ...newRecipe.nutrition };
      delete newRecipe.nutrition;

      return dataSources.recipeAPI.submitForApproval(newRecipe);
    },
    addRecipe: (
      root: any,
      args: any,
      { dataSources }: { dataSources: any }
    ) => {
      const recipe = args.recipe;
      recipe.nutritionValues = { ...recipe.nutrition };
      delete recipe.nutrition;

      return dataSources.recipeAPI.addRecipe(recipe, args.approvalId);
    },
    signIn: (
      root: any,
      args: any,
      { res, dataSources }: { res: any; dataSources: any }
    ) => {
      const user = {
        username: args.username,
        password: args.password,
      };
      res.cookie('test', 'qwerty', {
        path: '/',
        httpOnly: true,
        secure: false,
        sameSite: false,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
      });
      return dataSources.recipeAPI.signIn(user);
    },
    signUp: (root: any, args: any, { dataSources }: { dataSources: any }) => {
      const user = {
        username: args.username,
        password: args.password,
      };
      return dataSources.recipeAPI.signUp(user);
    },
  },
  Recipe: {
    // have to do this since graphql doesn't natively support maps yet -.-
    raters: ({ raters }: { raters: Map<string, string> }) => {
      const ratersIds = [];
      const ratersValues = [];
      for (const key of Object.keys(raters)) {
        ratersIds.push(key);
      }
      for (const value of Object.values(raters)) {
        ratersValues.push(value);
      }
      return {
        keys: ratersIds,
        values: ratersValues,
      };
    },
  },
};

module.exports = resolvers;
