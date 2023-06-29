/**
 * @getProjections is a service that will return products
 *  that are published
 */

const axios = require("axios");

const getProjections = async (token) => {
  console.log(token, "***token***");
  try {
    const { data } = await axios.get(
      `${process.env.CTP_API_URL}/${process.env.CTP_PROJECT_KEY}/product-projections`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProjections,
};
