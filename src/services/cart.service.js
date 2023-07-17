const apiRoot = require("../config");
const { v4: uuidv4 } = require("uuid");

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
    if (!cartID) {
      const { body } = await apiRoot
        .carts()
        .post({
          body: {
            currency: "EUR",
            lineItems: [{ productId: prodID, variantId: 1 }],
          },
        })
        .execute();
      console.log(body);
      return body;
    } else {
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
    }
  } catch (error) {
    console.log(error, "from the addLine Item service");
  }
};

/**
 * This service is used to addd email of the user
 * @returns the added email of the user
 */

const addCustomerEmailService = async (cartVersion, cartID, email) => {
  try {
    const { body } = await apiRoot
      .carts()
      .withId({ ID: cartID })
      .post({
        body: {
          version: parseInt(cartVersion),
          actions: [{ action: "setCustomerEmail", email }],
        },
      })
      .execute();
    console.log(body);
    return body;
  } catch (error) {
    console.log(error, " from the add cusotmer email service");
  }
};

/**
 * This service is used to enter the shipping address of the user
 * @param {string} cartVersion the currents verrson of hte cart
 * @param {string} cartID the id of the cart to which we wan to add the shiping address
 * @param {string} firstname first name of the user
 * @param {*} lastname lastname of the user
 * @param {*} address address of the user
 * @param {*} country the country of the user
 * @param {*} city the city of delivery
 * @param {*} zipCode the postalCode of the the city
 * @param {*} phone the phone no of the recipient
 * @returns adds the shipping address of the user
 */

const setShippingAddressService = async (
  cartVersion,
  cartID,
  firstname,
  lastname,
  address,
  country,
  city,
  zipCode,
  phone
) => {
  try {
    const { body } = await apiRoot
      .carts()
      .withId({ ID: cartID })
      .post({
        body: {
          version: parseInt(cartVersion),
          actions: [
            {
              action: "setShippingAddress",
              address: {
                country,
                firstName: firstname,
                lastName: lastname,
                additionalStreetInfo: address,
                city,
                phone,
                postalCode: zipCode,
              },
            },
          ],
        },
      })
      .execute();
    console.log(body);
    return body;
  } catch (error) {
    console.log(error, "from the add shipping address service");
  }
};

const setShippingMethodService = async (cartVersion, cartID, id) => {
  try {
    console.log(cartVersion, cartID, id);
    const { body } = await apiRoot
      .carts()
      .withId({ ID: cartID })
      .post({
        body: {
          version: parseInt(cartVersion),
          actions: [
            {
              action: "setShippingMethod",
              shippingMethod: {
                id,
                typeId: "shipping-method",
              },
            },
          ],
        },
      })
      .execute();
    console.log(body);

    return body;
  } catch (error) {
    console.log(error, "from the set shipping method service");
  }
};

/**
 * This service is used to enter the billing address of the user
 * @param {string} cartVersion the currents verrson of hte cart
 * @param {string} cartID the id of the cart to which we wan to add the billing address
 * @param {string} firstname first name of the user
 * @param {*} lastname lastname of the user
 * @param {*} address address of the user
 * @param {*} country the country of the user
 * @param {*} city the city of delivery
 * @param {*} zipCode the postalCode of the the city
 * @param {*} phone the phone no of the recipient
 * @returns adds the billing address of the user
 */

const setBillingAddressService = async (
  cartVersion,
  cartID,
  firstname,
  lastname,
  address,
  country,
  city,
  zipCode,
  phone
) => {
  try {
    console.log(
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
    const { body } = await apiRoot
      .carts()
      .withId({ ID: cartID })
      .post({
        body: {
          version: parseInt(cartVersion),
          actions: [
            {
              action: "setBillingAddress",
              address: {
                country,
                firstName: firstname,
                lastName: lastname,
                additionalStreetInfo: address,
                city,
                phone,
                postalCode: zipCode,
              },
            },
          ],
        },
      })
      .execute();
    console.log(body);
    return body;
  } catch (error) {
    console.log(error, "from the setBillingAddressService service");
  }
};

/**
 *
 */

const addPaymentMethod = async (cartID, cartVersion, id) => {
  try {
    console.log(cartID, cartVersion, id);
    const { body } = await apiRoot
      .carts()
      .withId({ ID: cartID })
      .post({
        body: {
          version: parseInt(cartVersion),
          actions: [
            { action: "addPayment", payment: { id, typeId: "payment" } },
          ],
        },
      })
      .execute();

    console.log(body);
    return body;
  } catch (error) {
    console.log(error, "form the addPaymentMethod service ");
  }
};

const convertCartToOrder = async (cartID, cartVersion) => {
  try {
    const uuid = uuidv4();
    const { body } = await apiRoot
      .orders()
      .post({
        body: {
          cart: { id: cartID, typeId: "cart" },
          version: parseInt(cartVersion),
          orderNumber: uuid,
        },
      })
      .execute();
    console.log(body);
    return body;
  } catch (error) {
    console.log(error.body, "from the converCartTo Order service");
  }
};

const getCartService = async (cartID) => {
  try {
    const { body } = await apiRoot
      .carts()
      .withId({ ID: cartID })
      .get()
      .execute();
    console.log(body);
    return body;
  } catch (error) {
    console.log(error, "from the get cart service");
  }
};

const removeLineItemService = async (cartID, cartVersion, lineItem) => {
  try {
    const { body } = await apiRoot
      .carts()
      .withId({ ID: cartID })
      .post({
        body: {
          version: parseInt(cartVersion),
          actions: [
            {
              action: "removeLineItem",
              lineItemId: lineItem,
            },
          ],
        },
      })
      .execute();
    console.log(body);
    return body;
  } catch (error) {
    console.log(error, "from the remove line item service");
  }
};

module.exports = {
  addLineItem,
  addCustomerEmailService,
  setShippingAddressService,
  setShippingMethodService,
  setBillingAddressService,
  addPaymentMethod,
  convertCartToOrder,
  getCartService,
  removeLineItemService,
};
