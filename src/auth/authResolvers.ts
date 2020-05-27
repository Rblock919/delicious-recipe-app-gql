import { AuthenticationError } from 'apollo-server';
import jwt from 'jsonwebtoken';

export const authResolvers = {
  Query: {
    signOut: () => {
      // TODO: invalidate token?
      return 'Signed Out';
    },
  },
  Mutation: {
    login: async (_, { input }, { models }) => {
      // TODO: incorporate login schema logic
      const { username, password } = input;
      let validPassword;
      let payload;
      const query = { username: escape(username) };
      const user = await models.User.findOne(query, '-__v');
      if (user) {
        validPassword = await user.passwordIsValid(password);
      }
      if (validPassword) {
        payload = {
          sub: user._id,
          isAdmin: user.isAdmin,
          username: user.username,
        };
        const token = await jwt.sign(payload, process.env.TOKEN_SECRET, {
          expiresIn: 7 * 24 * 60 * 60 * 1000,
        });
        return { user, token };
      }
      throw new AuthenticationError('Wrong Username/Password');
    },
    register: async (_, { input }, { models }) => {
      const { username, password } = input;
      const newUser = new models.User({
        username,
        password,
        isAdmin: false,
      });
      try {
        const user = await newUser.save();
        const payload = {
          sub: user._id,
          isAdmin: false,
          username: user.username,
        };
        const token = await jwt.sign(payload, process.env.TOKEN_SECRET, {
          expiresIn: 7 * 24 * 60 * 60 * 1000,
        });
        return { user, token };
      } catch (error) {
        if (error.code === 11000) {
          return new Error('Username already exists');
        }
        return new Error('Error creating user');
      }
    },
  },
};
