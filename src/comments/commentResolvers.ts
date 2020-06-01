export const commentResolvers = {
  Query: {
    recipeComments: async (_, { recipeId }, { models }) => {
      return models.Comment.find({ recipe: recipeId });
    },
    userComments: async (_, { userId }, { models }) => {
      return models.Comment.find({ author: userId });
    },
  },
  Mutation: {
    // TODO: improve method with try-catches and better errors
    createComment: async (_, { input }, { models, user }) => {
      const { recipeId, body } = input;
      const newComment = {
        author: user._id,
        recipe: recipeId,
        body,
      };
      const comment = new models.Comment(newComment);
      const createdComment = await comment.save();

      const recipe = await models.Recipe.findById(recipeId);
      const comments = recipe.comments || [];

      comments.push(createdComment._id);
      await models.Recipe.findByIdAndUpdate(
        recipeId,
        { $set: { comments } },
        { upsert: true, new: true }
      );
      return createdComment;
    },
    deleteComment: async (_, { id }, { models }) => {
      try {
        await models.Comment.findByIdAndDelete(id);
        return 'Success';
      } catch (error) {
        return new Error(`Error: ${error}`);
      }
    },
  },
  Comment: {
    author: async ({ author }, _, { loaders }) => {
      return loaders.User.load(author);
    },
    recipe: async ({ recipe }, _, { loaders }) => {
      return loaders.Recipe.load(recipe);
    },
  },
};
