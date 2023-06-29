const express = require("express");
const productRouter = express.Router();
const { getProducts } = require("../controller/productsController");

productRouter.get("/fetch", getProducts);

module.exports = productRouter;
