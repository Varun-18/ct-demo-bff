const apiRoot = require("../../config");
const { v4: uuidv4 } = require("uuid");

const productsQueryResolvers = {
  Query: {
    products: async (parent, args) => {
      try {
        const { page } = args;
        console.log(page);
        const { body } = await apiRoot
          .productProjections()
          .get({ queryArgs: { offset: page } })
          .execute();

        body.results.map((item) => {
          item.masterVariant.id = uuidv4();
          return item;
        });

        // console.log(, "***  FROM GQL ***");
        return body.results;
      } catch (error) {
        console.log(error, "from resolver");
      }
    },
  },
};

module.exports = { productsQueryResolvers };
