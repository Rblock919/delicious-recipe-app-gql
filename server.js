const express = require('express');
const { ApolloServer } = require('apollo-server-express');
// const { ApolloServer } = require('apollo-server');
const chalk = require('chalk');
const cors = require('cors');

const RecipeAPI  = require('./src/sources/recipeDataSource');
// const typeDefs = require('./src/graphql/typeDefs');
const recipeInputs = require('./src/graphql/inputs/recipeInput');
const recipeTypes = require('./src/graphql/types/recipeTypes');
const resolvers = require('./src/graphql/resolvers');

const remote = process.env.REMOTE || false;
if (!remote) {
  require('dotenv').config();
}

const server = new ApolloServer({
  typeDefs: [recipeInputs, recipeTypes],
  resolvers,
  context: ({ req, res }) => {
    const token = req.headers.authorization || '';
    return {
      req,
      res,
      token
    }
    // req,
    // res
  },
  dataSources: () => ({
    recipeAPI: new RecipeAPI()
  })
});

const app = express();

// Configure cross-origin requests
app.use(cors({origin: true, credentials: true}));
server.applyMiddleware({ app, path: '/', cors: false});

const port = process.env.PORT || 4000;

app.listen(port, (err) => {
  if (err) {
    console.log(chalk.red(`err: ${err}`));
  } else {
    console.log(chalk.magenta(`🚀 Graphql server listening on port ${chalk.underline(port)}`));
  }
});

process.on('SIGINT', () => {
  console.log('graphql server shutting down...');
  process.exit(0);
});

// server.listen().then(({ url }) => {
//   console.log(`🚀 GraphQL server ready at ${url}!`)
// });
