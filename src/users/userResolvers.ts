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
    updateUsers: (_, args, { dataSources }) => {
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
  },
};
