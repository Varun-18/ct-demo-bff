const { getCartService } = require("../../services/cart.service");

const cartQueryResolver = {
  getCart: async (parent, args) => {
        try {
        console.log(args)
      const { cartID } = args;
      const data = await getCartService(cartID);
      return data;
    } catch (error) {
      console.log(error, "from the getCart form cartQueryresolver");
    }
  },
};

module.exports = { cartQueryResolver };
