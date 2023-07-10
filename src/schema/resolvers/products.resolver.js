const {
  getProductsService,
  getProductsByKeyword,
  getProducstById,
} = require("../../services/products.service");

const { getSuggestions } = require("../../services/suggestion.service");
const cookie = require("cookie");

/**
 * Resolves the Queries related to fetching the products and suggestions
 */

const productsQueryResolvers = {
  Query: {
    /**
     *This is the resolver that resolves the products queries
     * @param {*} args gives the page number and any keywords that are searched for
     * @returns {Array} array of products
     */

    products: async (parent, args) => {
      try {
        const { searched, page } = args;
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

    /**
     * This resolver gives details of a particular product
     * @param {*} args contains the id of the products whose deatils are requested
     * @returns {object} product object
     */

    product: async (parent, args) => {
      try {
        const { id } = args;
        const data = await getProducstById(id);
        return data;
      } catch (error) {
        console.log(error, "from get product by id");
      }
    },

    /**
     * This is the resolver that is used to provude suggestions to the users
     * @param {*} args contains the letters typed in the search bar
     * @returns {Array} array of suggestions
     */

    suggestions: async (parent, args) => {
      try {
        const { keyword } = args;
        console.log(keyword, "*** suggestion ***");

        const data = await getSuggestions(keyword);
        return data;
      } catch (error) {
        console.log(error, "from the *** suggestions ***");
      }
    },
  },
};

module.exports = { productsQueryResolvers };
