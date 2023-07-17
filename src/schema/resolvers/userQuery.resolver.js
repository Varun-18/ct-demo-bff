const {
  verfiyTokenService,
  randomOrders,
} = require("../../services/user.service");

const userQueryResolver = {
  myOrders: async (parent, args, { token }) => {
    try {
      const tokenValue = token.split("=")[1];
      console.log(tokenValue, "hello");
      const { id, email } = await verfiyTokenService(tokenValue);
      const data = await randomOrders(id, email);
      return data;
    } catch (error) {
      console.log(error, "from get my oerder resolver");
    }
  },
};

module.exports = { userQueryResolver };
