const { firebase } = require("../../firebase.config");
const {
  verifyUserService,
  checkExistingService,
  createUserOnCT,
} = require("../../services/user.service");

const userResolver = {
  Mutation: {
    checkUser: async (parents, args) => {
      try {
        const { email, phone } = args.data;
        console.log(email, phone);
        const result = await checkExistingService(email, phone);
        return result;
      } catch (error) {
        console.log(error, "from the verfication of hte user");
      }
    },
    addUser: async (parent, args, { res }) => {
      try {
        const { stsTokenManager } = args.data;
        const { email, phone_number } = await verifyUserService(
          stsTokenManager.accessToken
        );
        const final = await createUserOnCT(email, phone_number);
        return final;
      } catch (error) {
        console.log(error, "from add User mutaion ");
      }
    },
    loginUser: async (parent, args, { res }) => {
      try {
        const { token } = args.data;
        const { email, phone_number } = await verifyUserService(token);
        console.log(email, phone_number, "from resolver of login");
        res.cookie("token", `varun login token`, { httpOnly: true });
        console.log("after cookie");
        return { email, phone: phone_number };
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = { userResolver };
