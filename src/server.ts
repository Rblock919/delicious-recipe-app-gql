import express, { Request, Response } from 'express';
import { ApolloServer } from 'apollo-server-express';
import chalk from 'chalk';
import cors from 'cors';
import 'dotenv/config';
import depthLimit from 'graphql-depth-limit';

import { connectMongo, models } from './db';
import { loaders } from './loaders';
import { getUserFromToken } from './helpers';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { schemaDirectives } from './directives';

connectMongo();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives,
  validationRules: [depthLimit(3)],
  context: async ({ req, res }: { req: Request; res: Response }) => {
    const token = req.headers.authorization || '';
    const user = await getUserFromToken(token);

    return {
      req,
      res,
      user,
      models,
      loaders: loaders(),
    };
  },
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
