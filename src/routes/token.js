const express = require("express");
const router = express.Router();
const { tokenController } = require("../controller/authController");

router.get("/token", tokenController);

module.exports = router;
