const apiRoot = require("../config");
const { v4: uuidv4 } = require("uuid");
/**
 * This service creates a cart for the guest user
 * @returns the deatils of the cart that was created
 */

const createCartService = async () => {
  try {
    const anonymousId = uuidv4();
    const { body } = await apiRoot
      .carts()
      .post({ body: { currency: "EUR", anonymousId } })
      .execute();
    console.log(body);
    return body;
  } catch (error) {
    console.log(error, "from create cart service");
  }
};

/**
 * This functions adds the line-items to the cart based on the current cart version
 * @param {number} cartVersion the current version of the cart
 * @param {String} cartID the alpha numeric string that represents the id of the cart
 * @param {String} prodID alpha numeric string that has the id of the product that is added to the cart
 * @returns
 */

const addLineItem = async (cartVersion, cartID, prodID) => {
  try {
    console.log(cartID, prodID, "from the add lineItem service");

    const { body } = await apiRoot
      .carts()
      .withId({ ID: cartID })
      .post({
        body: {
          version: cartVersion ? parseInt(cartVersion) : 1,
          actions: [
            {
              action: "addLineItem",
              productId: prodID,
              variantId: 1,
              // quantity: 1,
            },
          ],
        },
      })
      .execute();

    return body;
  } catch (error) {
    console.log(error, "from the addLine Item service");
  }
};

module.exports = {
  createCartService,
  addLineItem,
};
