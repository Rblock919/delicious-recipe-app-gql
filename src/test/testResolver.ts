export const testResolvers = {
  Query: {
    getTester: (root, args, context, info) => {
      return { name: 'Test Name Here' };
    },
  },
};
