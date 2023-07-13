const {
  createCartService,
  addLineItem,
} = require("../../services/cart.service");

const cartResolver = {
  Mutation: {
    /**
     * This resolver handles the complete add to cart functionality
     * @returns the cart id and the current cart version after updating the cart
     */

    addToCart: async (parent, args) => {
      try {
        const { cartVersion, cartID, lineItem } = args.data;
        console.log(cartID, lineItem);
        if (!cartID) {
          console.log("without cart id");
          const data = await createCartService();
          const { id, version, anonymousId } = await addLineItem(
            cartVersion,
            data.id,
            lineItem
          );
          return { id, version, anonymousId: data.anonymousId };
        } else {
          const { id, version } = await addLineItem(
            cartVersion,
            cartID,
            lineItem
          );
          return { id, version };
        }
      } catch (error) {
        console.log(error, " from the add to cart resolver");
      }
    },
  },
};

module.exports = {
  cartResolver,
};
