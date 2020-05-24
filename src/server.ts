import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import chalk from 'chalk';
import cors from 'cors';
import 'dotenv/config';

import { connectMongo, models } from './db';
import { getUserFromToken } from './helpers';
import { RecipeAPI } from './sources/recipeDataSource';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

connectMongo();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // TODO: apply express req and res types to these
  context: async ({ req, res }: { req: any; res: any }) => {
    const token = req.headers.authorization || '';
    const user = await getUserFromToken(token);

    return {
      req,
      res,
      user,
      models: {
        ...models,
      },
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
