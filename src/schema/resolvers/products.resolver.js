const apiRoot = require("../../config");
const { v4: uuidv4 } = require("uuid");

const productsQueryResolvers = {
  Query: {
    products: async (parent, args) => {
      try {
        const { page } = args;
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
    product: async (parent, args) => {
      try {
        const { id } = args;
        console.log(id, "*** ID ***");
        const { body } = await apiRoot
          .productProjections()
          .withId({ ID: id })
          .get()
          .execute();
        console.log(body);

        body.masterVariant.id = uuidv4();

        return body;
      } catch (error) {
        console.log(error, "from get product by id");
      }
    },
  },
};

module.exports = { productsQueryResolvers };
