import { ObjectId } from 'mongodb';
import { UserInputError, AuthenticationError } from 'apollo-server';

export const commentResolvers = {
  Query: {
    recipeComments: async (_, { recipeId }, { models }) => {
      let id = recipeId;
      // TODO: move this logic to a directive
      try {
        id = new ObjectId(id);
        return models.Comment.find({ recipe: id });
      } catch (error) {
        return new UserInputError('recipeId must be valid mongo id');
      }
    },
    userComments: async (_, { userId }, { models, user }) => {
      if (userId) {
        return models.Comment.find({ author: userId });
      }
      return models.Comment.find({ author: user._id });
    },
    comment: async (_, { id }, { models }) => {
      return models.Comment.findById(id);
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
        const comment = await models.Comment.findByIdAndDelete(id);
        const recipe = await models.Recipe.findById(comment.recipe);

        let { comments } = recipe;
        comments = comments.filter(x => x !== id);

        await models.Recipe.findByIdAndUpdate(comment.recipe, {
          $set: { comments },
        });

        return 'Success';
      } catch (error) {
        // TODO: return better error here
        return new Error(`Error: ${error}`);
      }
    },
    updateComment: async (_, { input }, { models, user }) => {
      const { id, body } = input;
      const comment = await models.Comment.findById(id);
      // TODO: possibly impelement this into a directive
      if (`${comment.author}` !== user._id) {
        return new AuthenticationError(
          'Only the author of a comment can update it.'
        );
      }
      const updatedAt = Date.now();
      return models.Comment.findByIdAndUpdate(
        id,
        { $set: { body, updatedAt } },
        { upsert: true, new: true }
      );
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
