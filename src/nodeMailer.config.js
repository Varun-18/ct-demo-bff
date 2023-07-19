const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mernhub@gmail.com",
    pass: "rmzptheuhdmgufbz",
  },
});

module.exports = { transporter };
