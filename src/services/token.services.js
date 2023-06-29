const axios = require("axios");

/**
 * @getToken is a service that is used to get the access token
 * for clientcredentials flow
 */

const getToken = async () => {
  try {
    // Create a base64-encoded string of the credentials

    const credentials = Buffer.from(
      `${process.env.CTP_CLIENT_ID}:${process.env.CTP_CLIENT_SECRET}`
    ).toString("base64");

    const { data } = await axios.post(
      `${process.env.CTP_AUTH_URL}/oauth/token?grant_type=client_credentials`,
      {},
      {
        headers: {
          Authorization: `Basic ${credentials}`, // Structure as specifeid in the postman collection
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getToken };
