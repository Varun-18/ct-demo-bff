// import { getProducts } from "./src/controller/productsController";
const dotenv = require("dotenv");
dotenv.config();

const fetch = require("node-fetch");

// const axios = require("axios");
const {
  createApiBuilderFromCtpClient,
} = require("@commercetools/platform-sdk");

const { ClientBuilder } = require("@commercetools/sdk-client-v2");

const projectKey = process.env.CTP_PROJECT_KEY;
// const scopes = ['{scope}'];
const scopes = [`${process.env.CTP_SCOPES}`];

// Configure authMiddlewareOptions
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

// Configure httpMiddlewareOptions
const httpMiddlewareOptions = {
  host: process.env.CTP_API_URL,
  scopes,
  fetch,
};

// Export the ClientBuilder
// export
const ctpClient = new ClientBuilder()
  .withProjectKey(process.env.CTP_PROJECT_KEY) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  // .withLoggerMiddleware() // Include middleware for logging
  .build();

// Create apiRoot from the imported ClientBuilder and include your Project key
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: process.env.CTP_PROJECT_KEY,
});

// Example call to return Project information
// This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.

// Retrieve Project information and output the result to the log
// getProject().then(console.log).catch(console.error);

// const getProductsSDK = apiRoot.productProjections();

module.exports = apiRoot;
