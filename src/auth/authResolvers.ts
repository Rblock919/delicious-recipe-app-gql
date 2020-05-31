import { AuthenticationError } from 'apollo-server';
import jwt from 'jsonwebtoken';

export const authResolvers = {
  Query: {
    logout: () => {
      // TODO: invalidate token?
      return 'Signed Out';
    },
  },
  Mutation: {
    login: async (_, { input }, { req, models }) => {
      const { username, password } = input;
      const clientIP = req.connection.remoteAddress;
      const identityKey = `${username}-${clientIP}`;

      if (await models.Login.inProgress(identityKey)) {
        return new AuthenticationError('Login Already In Progress');
      }

      if (!(await models.Login.canAuthenticate(identityKey))) {
        await models.Login.endProgress(identityKey);
        return new AuthenticationError(
          'The account is temporarily locked due to excessive number of login attempts. Please try again in a few minutes.'
        );
      }

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

        await models.Login.successfulLoginAttempt(identityKey);

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
