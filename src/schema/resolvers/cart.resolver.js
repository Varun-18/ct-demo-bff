const {
  addLineItem,
  addCustomerEmailService,
  setShippingAddressService,
  setShippingMethodService,
  setBillingAddressService,
} = require("../../services/cart.service");

const cartResolver = {
  /**
   * This resolver handles the complete add to cart functionality
   * @returns the cart id and the current cart version after updating the cart
   */

  addToCart: async (parent, args) => {
    try {
      const { cartVersion, cartID, lineItem } = args.data;
      console.log(cartID, lineItem);
      const { id, version } = await addLineItem(cartVersion, cartID, lineItem);
      return { id, version };
    } catch (error) {
      console.log(error, " from the add to cart resolver");
    }
  },

  /**
   * This function is used to set the customer Email of the user for a particular order
   * @returns add the email address of the user
   */

  addCustomerEmail: async (parent, args, { res }) => {
    try {
      const { cartVersion, cartID, email } = args.data;
      const { id, version, customerEmail } = await addCustomerEmailService(
        cartVersion,
        cartID,
        email
      );
      return { id, version, customerEmail };
    } catch (error) {
      console.log(error, "form the add email to cart resolver");
    }
  },

  /**
   *  This function is used to add the shipping method of the cart
   * @param {object} args contains the cart-id, version ,adn the shipping address of the cart
   * @returns the updated version and the cart id  along with the shipping address
   */
  addShippingAddress: async (parent, args) => {
    try {
      const {
        cartVersion,
        cartID,
        firstname,
        lastname,
        address,
        country,
        city,
        zipCode,
        phone,
      } = args.data;

      const { id, version, shippingAddress } = await setShippingAddressService(
        cartVersion,
        cartID,
        firstname,
        lastname,
        address,
        country,
        city,
        zipCode,
        phone
      );
      return { id, version, shippingAddress };
    } catch (error) {
      console.log(error, "from add shipping address resolvers");
    }
  },

  /**
   * This function is used to add the shipping method based on the id
   * @param {object} args contains the shipping method and current version of hte cart
   * @returns the updated cart version and the shipping method opted by the user
   */

  addShippingMethod: async (parent, args) => {
    try {
      const { cartVersion, cartID, id } = args.data;
      const result = await setShippingMethodService(cartVersion, cartID, id);
      return {
        id: result.id,
        version: result.version,
        shippingMethod: result.shippingInfo.shippingMethodName,
      };
    } catch (error) {
      console.log(error, "from the add shipping method resolver");
    }
  },

  addBillingAddress: async (parent, args) => {
    try {
      const {
        cartVersion,
        cartID,
        firstname,
        lastname,
        address,
        country,
        city,
        zipCode,
        phone,
      } = args.data;

      const { id, version, billingAddress } = await setBillingAddressService(
        cartVersion,
        cartID,
        firstname,
        lastname,
        address,
        country,
        city,
        zipCode,
        phone
      );

      return { id, version, billingAddress };
    } catch (error) {
      console.log(error, "from billing address resolvers");
    }
  },
};

module.exports = {
  cartResolver,
};
