import mongoose from 'mongoose';
import { UserInputError } from 'apollo-server';

export const userResolvers = {
  Query: {
    me: (_, __, { user }) => {
      return user;
    },
    users: async (_, __, { models }) => {
      return models.User.find();
    },
  },
  Mutation: {
    updateUsers: async (_, { input }, { models }) => {
      const updatedUsers = input;
      let setToTrueIds: string[];
      let setToFalseIds: string[];

      try {
        setToTrueIds = updatedUsers
          .map(user => {
            return user.isAdmin
              ? new mongoose.Types.ObjectId(user.userId)
              : null;
          })
          .filter(x => x !== null);

        setToFalseIds = updatedUsers
          .map(user => {
            return user.isAdmin
              ? null
              : new mongoose.Types.ObjectId(user.userId);
          })
          .filter(x => x !== null);
      } catch (error) {
        console.log('err: ', error);
        throw new UserInputError('Ids in idArr Must Be Valid MongoDB Ids');
      }

      try {
        if (setToTrueIds.length > 0) {
          await models.User.updateMany(
            { _id: { $in: setToTrueIds } },
            { $set: { isAdmin: true } }
          );
        }
        if (setToFalseIds.length > 0) {
          await models.User.updateMany(
            { _id: { $in: setToFalseIds } },
            { $set: { isAdmin: false } }
          );
        }
      } catch (error) {
        console.log('err updating users: ', error);
        throw new UserInputError('Error Updating Users in DB');
      }

      return 'Success';
    },
  },
};
