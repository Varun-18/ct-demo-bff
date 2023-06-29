const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const typeDefs = require("./src/schema/types/index");

const { resolvers } = require("./src/schema/resolvers/index");

const server = new ApolloServer({ typeDefs, resolvers });

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 5000 },
  });
  console.log("🚀 The server is running at port ", url);
};

startServer();
