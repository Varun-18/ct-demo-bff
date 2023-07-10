const dotenv = require("dotenv");
const fetch = require("node-fetch");
const { default: sdkAuth } = require("@commercetools/sdk-auth");

dotenv.config();

const scopes = [`${process.env.CTP_SCOPES}`];

const authMiddlewareOptions = {
  host: process.env.CTP_AUTH_URL,
  projectKey: process.env.CTP_PROJECT_KEY,
  credentials: {
    clientId: process.env.CTP_CLIENT_ID,
    clientSecret: process.env.CTP_CLIENT_SECRET,
  },
  scopes,
  fetch,
};

const authClient = new sdkAuth(authMiddlewareOptions);

module.exports = authClient;
