import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import chalk from 'chalk';
import cors from 'cors';
import dotenv from 'dotenv';

import RecipeAPI from './sources/recipeDataSource';
import recipeInputs from './graphql/inputs/recipeInput';
import recipeTypes from './graphql/types/recipeTypes';
import resolvers from './graphql/resolvers';

const remote = process.env.REMOTE || false;
if (!remote) {
  dotenv.config();
}

const server = new ApolloServer({
  typeDefs: [recipeInputs, recipeTypes],
  resolvers,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: async ({ req, res }: { req: any; res: any }) => {
    const token = req.headers.authorization || '';
    return {
      req,
      res,
      token
    };
    // req,
    // res
  },
  dataSources: () => ({
    recipeAPI: new RecipeAPI()
  })
});

const app = express();

// Configure cross-origin requests
app.use(cors({ origin: true, credentials: true }));
server.applyMiddleware({ app, path: '/', cors: false });

const port = process.env.PORT || 4000;

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

// server.listen().then(({ url }) => {
//   console.log(`🚀 GraphQL server ready at ${url}!`)
// });
