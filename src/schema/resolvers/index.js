const { productsQueryResolvers } = require("./products.resolver");
const { userResolver } = require("./user.resolver")
const {cartResolver} = require("./cart.resolver")

module.exports.resolvers = { ...productsQueryResolvers,...userResolver, ...cartResolver };
