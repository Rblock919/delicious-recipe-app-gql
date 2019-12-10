const { ApolloServer } = require('apollo-server');
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
  dataSources: () => ({
    recipeAPI: new RecipeAPI()
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 GraphQL server ready at ${url}!`)
});
