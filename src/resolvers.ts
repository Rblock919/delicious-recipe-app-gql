import { AuthenticationError } from 'apollo-server';
import jwt from 'jsonwebtoken';
// TODO: eventualy make this function like root level typeDefs once these get moved out

export const resolvers = {
  Query: {
    signOut: (_, __, { dataSources }) => dataSources.recipeAPI.signOut(),
  },
  Mutation: {
    signIn: async (_, { username, password }, { models }) => {
      // TODO: incorporate login schema logic
      let validPassword;
      let payload;
      const query = { username: escape(username) };
      const user = await models.userModel.findOne(query, '-__v');
      if (user) {
        validPassword = await user.passwordIsValid(password);
      }
      if (validPassword) {
        payload = { sub: user._id };
        const token = await jwt.sign(payload, process.env.TOKEN_SECRET, {
          expiresIn: 7 * 24 * 60 * 60 * 1000,
        });
        return { user, token };
      }
      throw new AuthenticationError('Unauthorized');
    },
    signUp: (_, args, { dataSources }) => {
      const { username, password } = args;
      return dataSources.recipeAPI.signUp({ username, password });
    },
  },
};
