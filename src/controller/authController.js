const { getToken } = require("../services/token.services");

const tokenController = async (req, res) => {
  try {
    const token = await getToken();
    console.log(token);
    res
      .status(200)
      .cookie("authToken", token.access_token, {
        sameSite: "strict",
        httpOnly: true,
        Expires: token.expires_in,
      })
      .send("success");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { tokenController };
