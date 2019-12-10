const resolvers = {
  Query: {
    users: (root, args, { dataSources }) => dataSources.recipeAPI.getAllUsers(),
    recipe: (root, { recipeId }, { dataSources }) => dataSources.recipeAPI.getRecipe(recipeId),
    recipes: (root, args, { dataSources }) => dataSources.recipeAPI.getAllRecipes(),
    unapprovedRecipes: (root, args, { dataSources }) => dataSources.recipeAPI.getAllUnapprovedRecipes(),
    unapprovedRecipe: (root, { recipeId }, { dataSources }) => dataSources.recipeAPI.getUnapprovedRecipe(recipeId)
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
