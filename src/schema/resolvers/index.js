const { productsQueryResolvers } = require("./products.resolver");
const { userMutationResolver } = require("./user.resolver");
const { cartResolver } = require("./cart.resolver");

const resolvers = {
  Query: {
    ...productsQueryResolvers,
  },
  Mutation: {
    ...userMutationResolver,
    ...cartResolver,
  },
};

module.exports = { resolvers };
