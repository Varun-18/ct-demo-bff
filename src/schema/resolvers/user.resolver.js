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
        res.setHeader("Set-Cookie", "myCookie=varun; Max-Age=3600; Path=/");
        return final;
      } catch (error) {
        console.log(error, "from add User mutaion ");
      }
    },
    loginUser: async (parent, args, context) => {
      try {
        const { token } = args.data;
        const { email, phone_number } = await verifyUserService(token);
        console.log(email, phone_number, "from resolver of login");
        // res.cookie("token", `123123123`);
        const { setCustomCookie } = context.res;
        setCustomCookie("demoCookie", "varun123");
        return { email, phone: phone_number };
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = { userResolver };
