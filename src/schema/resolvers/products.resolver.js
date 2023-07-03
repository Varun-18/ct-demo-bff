const {
  getProductsService,
  getProductsByKeyword,
  getProducstById,
} = require("../../services/products.service");

const { getSuggestions } = require("../../services/suggestion.service");


/**
 * Resolves the Queries related to fetching the products
 */

const productsQueryResolvers = {
  Query: {
    products: async (parent, args) => {
      try {
        const { searched, page } = args;
        console.log(searched);
        if (!searched) {
          const data = await getProductsService(page);

          return data.results;
        } else {
          const data = await getProductsByKeyword(searched, page);
          return data.results;
        }
      } catch (error) {
        console.log(error, "from resolver");
      }
    },
    product: async (parent, args) => {
      try {
        const { id } = args;
        const data = await getProducstById(id);
        return data;
      } catch (error) {
        console.log(error, "from get product by id");
      }
    },

    suggestions: async (parent, args) => {
      try {
        const { keyword } = args;
        console.log(keyword);

        const data = await getSuggestions(keyword);
        return data;
      } catch (error) {
        console.log(error, "from the *** suggestions ***");
      }
    },
  },
};

module.exports = { productsQueryResolvers };
