import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import chalk from 'chalk';
import cors from 'cors';
import 'dotenv/config';

import { RecipeAPI } from './sources/recipeDataSource';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { testResolvers } from './test/testResolver';
import { recipeResolvers } from './recipes';

const server = new ApolloServer({
  typeDefs,
  resolvers: [resolvers, recipeResolvers, testResolvers],
  context: async ({ req, res }: { req: any; res: any }) => {
    const token = req.headers.authorization || '';
    return {
      req,
      res,
      token,
    };
  },
  dataSources: () => ({
    recipeAPI: new RecipeAPI(),
  }),
});

const app = express();

// Configure cross-origin requests
app.use(cors({ origin: true, credentials: true }));
server.applyMiddleware({ app, path: '/', cors: false });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(
    chalk.magenta(
      `🚀 Graphql server listening on port ${chalk.underline(port)}`
    )
  );
});

process.on('SIGINT', () => {
  console.log('graphql server shutting down...');
  process.exit(0);
});
