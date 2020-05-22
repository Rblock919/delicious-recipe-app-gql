// TODO: eventualy make this function like root level typeDefs once these get moved out

export const resolvers = {
  Query: {
    users: (root, args, { dataSources }) => dataSources.recipeAPI.getAllUsers(),
    signOut: (root, args, { dataSources }) => dataSources.recipeAPI.signOut(),
    me: (root, args, { dataSources }) => dataSources.recipeAPI.getUserData(),
  },
  Mutation: {
    updateUsers: (root, args, { dataSources }) => {
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
    signIn: (root, args, { res, dataSources }) => {
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
    signUp: (root, args, { dataSources }) => {
      const { username, password } = args;
      return dataSources.recipeAPI.signUp({ username, password });
    },
  },
};
