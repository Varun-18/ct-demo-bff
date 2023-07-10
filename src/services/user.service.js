const { firebase } = require("../firebase.config");
const apiRoot = require("../config");
// const { } = require("firebase-admin/auth")

/**
 * This service verifies the token for 2 factor authentication
 * @param {String} token the access token which were are going to verify
 * @returns weather the token is valid or not
 */

const verifyUserService = async (token) => {
  try {
    const { email, phone_number } = await firebase.auth().verifyIdToken(token);
    return { email, phone_number };
  } catch (error) {
    console.log(error, "user token verification service");
  }
};

/**
 * This service checks weather the user already exists or not
 * and if the user does not exist then firebase directly sends an error
 * so we need to wirte further logic in the catch block
 * @param {String} email The email of the user
 * @param {String} phone The phone number of the user
 * @return checks the user is already exists or not
 */

const checkExistingService = async (email, phone) => {
  try {
    if (!email) {
      console.log(email, "no email");
      throw { phone };
    }
    const result = await firebase.auth().getUserByEmail(email);
    console.log(result, "from the check existing service");
    return "email already in use";
  } catch (error) {
    if (error.phone) {
      try {
        const result = await firebase.auth().getUserByPhoneNumber(error.phone);
        console.log(result, "from new thrown error");
        return result;
      } catch (error) {
        return true;
      }
    }
    if (error.errorInfo.code === "auth/user-not-found") {
      try {
        const result = await firebase.auth().getUserByPhoneNumber(phone);

        console.log(result, "form the try of the 1st catch");
        return "phone no already in use";
      } catch (error) {
        console.log(error.errorInfo, "2nd catch block ");
        if (error.errorInfo.code === "auth/user-not-found") {
          return true;
        }
      }
    }
  }
};

/**
 * This service adds the user to the commerce tools data base
 * @param {string} email this is the email of the new user
 * @param {string} phone this is the phone of the user
 * @returns it confirms that the user is added to the commerce tools DB
 */

const createUserOnCT = async (email, phone) => {
  try {
    const data = await apiRoot
      .me()
      .signup()
      .post({
        body: {
          email,
          password: email,
          custom: {
            type: {
              key: "phone-number",
              typeId: "type",
            },
            fields: {
              phone: phone,
            },
          },
        },
      })
      .execute();
    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  verifyUserService,
  checkExistingService,
  createUserOnCT,
};
