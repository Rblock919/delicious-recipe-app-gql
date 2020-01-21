const assembleRecipe = require('../functions/assembleRecipe');

const resolvers = {
  Query: {
    users: (root, args, { dataSources }) => dataSources.recipeAPI.getAllUsers(),
    recipe: (root, { id }, { dataSources }) => dataSources.recipeAPI.getRecipe(id),
    recipes: (root, args, { dataSources }) => dataSources.recipeAPI.getAllRecipes(),
    unapprovedRecipe: (root, { id }, { dataSources }) => dataSources.recipeAPI.getUnapprovedRecipe(id),
    unapprovedRecipes: (root, args, { dataSources }) => dataSources.recipeAPI.getAllUnapprovedRecipes(),
    signOut: (root, args, { dataSources }) => dataSources.recipeAPI.signOut(),
    getUserData: (root, args, { dataSources }) => dataSources.recipeAPI.getUserData()
  },
  Mutation: {
    deleteRecipe: (root, { id }, { dataSources }) => dataSources.recipeAPI.deleteRecipe(id),
    rejectRecipe: (root, { id }, { dataSources }) => dataSources.recipeAPI.rejectRecipe(id),
    rateRecipe: (root, args, { dataSources }) => {
      const recipeInfo = {
        _id: args.id,
        ratersKeys: args.ratersKeys,
        ratersValues: args.ratersValues
      };
      return dataSources.recipeAPI.rateRecipe(recipeInfo);
    },
    favoriteRecipe: (root, args, { dataSources }) => {
      const recipeInfo = {
        _id: args.id,
        favoriters: args.favoriters
      };
      return dataSources.recipeAPI.favoriteRecipe(recipeInfo);
    },
    submitForApproval: (root, args, { dataSources }) => {
      const newRecipe = assembleRecipe(args);

      console.log(`recipe to submit for approval: \n${JSON.stringify(newRecipe)}`);
      return dataSources.recipeAPI.submitForApproval(newRecipe);
    },
    addRecipe: (root, args, { dataSources }) => {
      const recipe = { ...args };
      const newRecipe = assembleRecipe(recipe);

      return dataSources.recipeAPI.addRecipe(newRecipe, args.approvalId);
    },
    signIn: (root, args, { res, dataSources }) => {
      const user = {
        username: args.username,
        password: args.password
      };
      res.cookie('test', 'qwerty', {
        path: '/',
        httpOnly: true,
        secure: false,
        sameSite: false,
        maxAge: ((7 * 24 * 60 * 60) * 1000) // 1 week
      });
      return dataSources.recipeAPI.signIn(user);
    },
    signUp: (root, args, { dataSources }) => {
      const user = {
        username: args.username,
        password: args.password
      };
      return dataSources.recipeAPI.signUp(user);
    }
  },
  Recipe: {
    // have to do this since graphql doesn't natively support maps yet -.-
    raters:({ raters }) => {
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
        values: ratersValues
      };
    }
  }
};

module.exports = resolvers;
