const { productsQueryResolvers } = require("./products.resolver");
const {userResolver} = require("./user.resolver")

module.exports.resolvers = { ...productsQueryResolvers,...userResolver };
