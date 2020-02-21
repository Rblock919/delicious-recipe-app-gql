const express = require('express');
const { ApolloServer } = require('apollo-server-express');
// const { ApolloServer } = require('apollo-server');
const cors = require('cors');

const RecipeAPI  = require('./src/sources/recipeDataSource');
const typeDefs = require('./src/graphql/typeDefs');
const resolvers = require('./src/graphql/resolvers');

const remote = process.env.REMOTE || false;
if (!remote) {
  require('dotenv').config();
}

const server = new ApolloServer({
  typeDefs,
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
// server.applyMiddleware({ app, path: '/', cors: corsOptions});
server.applyMiddleware({ app, path: '/', cors: false});

const port = process.env.PORT || 4000;

app.listen(port, (err) => {
  if (err) {
    console.log(`err: ${err}`);
  } else {
    console.log(`🚀 Graphql server listening on port ${port}`);
  }
});

process.on('SIGINT', () => {
  console.log('graphql server shutting down...');
  process.exit(0);
});

// server.listen().then(({ url }) => {
//   console.log(`🚀 GraphQL server ready at ${url}!`)
// });
