const { getProjections } = require("../services/product.services");
// const { getProductsSDK } = require("../../config");
const apiRoot = require("../config");

const getProducts = async (req, res) => {
  try {
    const { authToken } = req.cookies;
    // console.log(authToken, "***authToken***");
    // const data = await getProjections(authToken);
    // console.log(data, "***DATA***");
    const { body } = await apiRoot.productProjections().get().execute();
    
    console.log(body.results, "********** from sdk ***********");
    res.status(200).send(body.results);
  } catch (error) { 
    console.log(error);
  }
};

module.exports = {
  getProducts,
};
