const { firebase } = require("../firebase.config");
const apiRoot = require("../config");
// const { } = require("firebase-admin/auth")

/**
 * This service checks the number of users of a particular email id
 * @param {string} email this is the email id for which we're going to check on firebase
 * @returns
 */

const getUserCount = async (email, uid) => {
  try {
    const data = await firebase.auth().getUserByEmail(email);
    return data.uid;
  } catch (error) {
    await firebase.auth().updateUser(uid, {
      email: email,
    });
    console.log(error, "from get get userCount");
  }
};

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
 * This service verifies the token for 2 factor authentication of Socials
 * @param {String} token the access token which were are going to verify
 * @returns weather the token is valid or not
 */

const verifySocialUserService = async (token) => {
  try {
    const { uid } = await firebase.auth().verifyIdToken(token);
    const data = await firebase.auth().getUser(uid);
    return { uid, providerData: data.providerData };
  } catch (error) {
    console.log(error, "user token verification service");
  }
};

const deleteDuplicateUser = async (uid) => {
  try {
    await firebase.auth().deleteUser(uid);
    return true;
  } catch (error) {
    console.log(error, "error in deleting user");
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
          console.log(email, "hello world");
          // const result = await firebase.auth().;
          // console.log(result);
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

const createUserOnCT = async (email, password, phone) => {
  try {
    const data = await apiRoot
      .me()
      .signup()
      .post({
        body: {
          email,
          password,
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
    console.log(error, "from create user on CT service");
  }
};

const verfiyTokenService = async (token) => {
  try {
    const { body } = await apiRoot
      .me()
      .get({ headers: { Authorization: `Bearer ${token}` } })
      .execute();
    console.log(body);
    return body;
  } catch (error) {
    console.log(error.errors);
  }
};

const randomOrders = async (id, email) => {
  try {
    const { body } = await apiRoot
      .orders()
      .get({ queryArgs: { where: `customerEmail="${email}"` } })
      .execute();
    // console.log(body);

    const data = await Promise.all(
      body.results.map(async (item) => {
        await apiRoot
          .orders()
          .withId({ ID: item.id })
          .post({
            body: {
              version: parseInt(item.version),
              actions: [{ action: "setCustomerId", customerId: id }],
            },
          })
          .execute();

        return item;
      })
    );

    // const newData = await data();

    console.log(data);
    return data;
  } catch (error) {
    console.log(error, "from the fetch random orders");
  }
};

module.exports = {
  verifyUserService,
  verifySocialUserService,
  getUserCount,
  deleteDuplicateUser,
  checkExistingService,
  createUserOnCT,
  verfiyTokenService,
  randomOrders,
};
