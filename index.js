const { ApolloServer } = require("@apollo/server");
const cors = require("cors");
// const { startStandaloneServer } = require("@apollo/server/standalone");
const { expressMiddleware } = require("@apollo/server/express4");

const typeDefs = require("./src/schema/types/index");

const { resolvers } = require("./src/schema/resolvers/index");
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { Process } = require("@commercetools/sdk-client-v2");

dotenv.config();

(async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Required logic for integrating with Express
  const app = express();
  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = http.createServer(app);

  // Ensure we wait for our server to start
  await server.start();

  // Set up our Express middleware to handle CORS, body parsing,
  // and our expressMiddleware function.
  app.use(
    "/",
    cors({ origin: process.env.CORS_URL, credentials: true }),

    bodyParser.json(),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server, {
      context: async ({ req, res }) => ({
        token: req.headers.cookie,
        req,
        res,
      }),
    })
  );

  // Modified server startup
  await new Promise((resolve) => httpServer.listen({ port: 5000 }, resolve));

  console.log(`🚀 Server ready at http://localhost:5000/`);
})();
