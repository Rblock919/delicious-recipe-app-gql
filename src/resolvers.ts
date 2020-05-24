// TODO: eventualy make this function like root level typeDefs once these get moved out

export const resolvers = {
  Query: {
    signOut: (_, __, { dataSources }) => dataSources.recipeAPI.signOut(),
  },
  Mutation: {
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
