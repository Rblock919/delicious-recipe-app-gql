// TODO: eventualy make this function like root level typeDefs once these get moved out

export const resolvers = {
  Query: {
    users: (_, __, { dataSources }) => dataSources.recipeAPI.getAllUsers(),
    signOut: (_, __, { dataSources }) => dataSources.recipeAPI.signOut(),
    me: (_, __, { dataSources }) => dataSources.recipeAPI.getUserData(),
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
    signIn: (_, args, { res, dataSources }) => {
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
    signUp: (_, args, { dataSources }) => {
      const { username, password } = args;
      return dataSources.recipeAPI.signUp({ username, password });
    },
  },
};
