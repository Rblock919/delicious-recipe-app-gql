import assembleMap from '../functions/assembleMap';

export default {
  Query: {
    users: (root, args, { dataSources }) => dataSources.recipeAPI.getAllUsers(),
    recipe: (root, { id }, { dataSources }) =>
      dataSources.recipeAPI.getRecipe(id),
    recipes: (root, args, { dataSources }) =>
      dataSources.recipeAPI.getAllRecipes(),
    unapprovedRecipe: (root, { id }, { dataSources }) =>
      dataSources.recipeAPI.getUnapprovedRecipe(id),
    unapprovedRecipes: (root, args, { dataSources }) =>
      dataSources.recipeAPI.getAllUnapprovedRecipes(),
    signOut: (root, args, { dataSources }) => dataSources.recipeAPI.signOut(),
    getUserData: (root, args, { dataSources }) =>
      dataSources.recipeAPI.getUserData(),
  },
  Mutation: {
    deleteRecipe: (root, { id }, { dataSources }) =>
      dataSources.recipeAPI.deleteRecipe(id),
    updateUsers: (root, args, { dataSources }) => {
      const ids = args.idArr as string[];
      const isAdmins = args.isAdminArr as string[];
      const users = [];

      ids.forEach((id, index) => {
        users.push({
          _id: id,
          isAdmin: isAdmins[index],
        });
      });

      return dataSources.recipeAPI.updateUsers(users);
    },
    rejectRecipe: (root, { id }, { dataSources }) =>
      dataSources.recipeAPI.rejectRecipe(id),
    rateRecipe: (root, args, { dataSources }) => {
      const newMap = assembleMap(args.ratersKeys, args.ratersValues);
      const recipeInfo = {
        _id: args.id,
        raters: newMap,
      };
      return dataSources.recipeAPI.rateRecipe(recipeInfo);
    },
    favoriteRecipe: (root, args, { dataSources }) => {
      const recipeInfo = {
        _id: args.id,
        favoriters: args.favoriters,
      };
      return dataSources.recipeAPI.favoriteRecipe(recipeInfo);
    },
    updateRecipe: (root, args, { dataSources }) => {
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
    submitForApproval: (root, args, { dataSources }) => {
      const newRecipe = args.recipe;
      newRecipe.nutritionValues = { ...newRecipe.nutrition };
      delete newRecipe.nutrition;

      return dataSources.recipeAPI.submitForApproval(newRecipe);
    },
    addRecipe: (root, args, { dataSources }) => {
      const { recipe } = args;
      recipe.nutritionValues = { ...recipe.nutrition };
      delete recipe.nutrition;

      return dataSources.recipeAPI.addRecipe(recipe, args.approvalId);
    },
    signIn: (root, args, { res, dataSources }) => {
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
    signUp: (root, args, { dataSources }) => {
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
