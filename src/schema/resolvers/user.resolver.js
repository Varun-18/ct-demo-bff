const {
  verifyUserService,
  checkExistingService,
  createUserOnCT,
  verifySocialUserService,
  getUserCount,
  deleteDuplicateUser,
} = require("../../services/user.service");

const authClient = require("../../authClient.config");

const brcypt = require("bcrypt");

/**
 * This is a resolver that peforms the user related logic
 * 1) creates a user
 * 2) verifies a user
 * 3) login process of a user
 */

const userMutationResolver = {
  /**
   * This resolver checks weather the user already exists or not
   * @param {*} args contains the email & password and/or phone of the user
   * @returns true if the user does not exists
   */

  checkUser: async (parents, args) => {
    console.log("check user hit");

    try {
      const { email, phone } = args.data;
      const result = await checkExistingService(email, phone);
      if (result === undefined) {
        return true;
      }
      return result;
    } catch (error) {
      console.log(error, "from the verfication of hte user");
    }
  },

  /**
   * This is the resolver that is used to add the user / create the user
   * in firebase as well as commerce tools
   * @param {*} args contains the credentials of the user
   * @returns confirmation upon adding the user
   */

  addUser: async (parent, args, { res }) => {
    try {
      const { stsTokenManager } = args.data;
      const { email, phone_number } = await verifyUserService(
        stsTokenManager.accessToken
      );

      const hash = await brcypt.hash(email, `${process.env.SALT}`);
      console.log(
        hash,
        "***************************HASH****************************"
      );

      const final = await createUserOnCT(email, hash, phone_number);
      const { access_token } = await authClient.customerPasswordFlow(
        {
          username: email,
          password: hash,
        },
        {
          disableRefreshToken: false,
        }
      );

      res.cookie("authToken", access_token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });

      return final;
    } catch (error) {
      console.log(error, "from add User mutaion ");
    }
  },

  /**
   * This is the resolver that is used to add the user / create the user
   * in firebase as well as commerce tools from Social Media Signup
   * @param {*} args contains the accesToken and basic deatils of the user
   * @returns confirmation upon adding the user
   */

  addSocialsUser: async (parent, args, { res }) => {
    try {
      const { stsTokenManager } = args.data;
      const { uid, providerData } = await verifySocialUserService(
        stsTokenManager.accessToken
      );
      const { email } = providerData[0];
      const id = await getUserCount(email, uid);
      console.log(id, "*** from socials signup ***", " uid ", uid);

      if (id === uid || id === undefined) {
        const hash = await brcypt.hash(email, `${process.env.SALT}`);
        console.log(
          hash,
          "***************************HASH****************************"
        );
        if (id === undefined) {
          await createUserOnCT(email, hash);
        }

        const { access_token } = await authClient.customerPasswordFlow(
          {
            username: email,
            password: hash,
          },
          {
            disableRefreshToken: false,
          }
        );

        console.log(access_token, "acces token ");

        res.cookie("authToken", access_token, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
        });

        return { email };
      } else {
        await deleteDuplicateUser(uid);
        return {
          status: 400,
          message:
            "user with this email already exits please choose another account..!!!",
        };
      }
    } catch (error) {
      console.log(error, "from add Socials User mutaion ");
    }
  },

  /**
   * This the resolver that is used to login the user
   * @param {*} args contains the credentials with which the user is trying to login
   * @param {*} param2 context object that has the request and the response object
   * we use the res object to set the httpOnly cookie in the browser
   * that cookie has the access token for accessing the me rotues of commerce tools
   * @returns the email and phone of the logged in user
   */

  loginUser: async (parent, args, { res }) => {
    console.log("hiited login");
    try {
      const { token } = args.data;
      const { email, phone_number } = await verifyUserService(token);

      const hash = await brcypt.hash(email, `${process.env.SALT}`);
      console.log(
        hash,
        "***************************HASH****************************"
      );
      const { access_token } = await authClient.customerPasswordFlow(
        {
          username: email,
          password: hash,
        },
        {
          disableRefreshToken: false,
        }
      );
      res.cookie("authToken", access_token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return { email, phone: phone_number };
    } catch (error) {
      console.log(error, "*** from login user mutaiton resolver ***");
    }
  },
};

module.exports = { userMutationResolver };
