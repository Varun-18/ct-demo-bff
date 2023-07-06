const { ApolloServer } = require("@apollo/server");
const cors = require("cors");
const { startStandaloneServer } = require("@apollo/server/standalone");

const typeDefs = require("./src/schema/types/index");

const { resolvers } = require("./src/schema/resolvers/index");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 5000 },
    context: ({ req }) => {
      const modifiedResponse = Object.create(req.res); // Create a new response object

      return {
        req,
        res: {
          ...modifiedResponse,
          setCustomCookie: (name, value) => {
            // Set the custom cookie
            modifiedResponse.setHeader(
              "Set-Cookie",
              `${name}=${value}; Path=/`
            );
          },
        },
      };
    },
  });
  console.log("🚀 The server is running at port ", url);
};

startServer();
