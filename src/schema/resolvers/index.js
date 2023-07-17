const { productsQueryResolvers } = require("./products.resolver");
const { userMutationResolver } = require("./user.resolver");
const { cartResolver } = require("./cart.resolver");
const { cartQueryResolver } = require("./cartQuery.resolver");
const { userQueryResolver } = require("./userQuery.resolver");

const resolvers = {
  Query: {
    ...productsQueryResolvers,
    ...cartQueryResolver,
    ...userQueryResolver,
  },
  Mutation: {
    ...userMutationResolver,
    ...cartResolver,
  },
};

module.exports = { resolvers };
