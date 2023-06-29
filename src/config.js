// import { getProducts } from "./src/controller/productsController";
const dotenv = require("dotenv");
dotenv.config();


const fetch = require("node-fetch");

// const axios = require("axios");
const {
  
  createApiBuilderFromCtpClient,
} = require("@commercetools/platform-sdk");

const {
  ClientBuilder,

} = require("@commercetools/sdk-client-v2");

const projectKey = process.env.CTP_PROJECT_KEY;
// const scopes = ['{scope}'];

// Configure authMiddlewareOptions
const authMiddlewareOptions = {
  host: "https://auth.europe-west1.gcp.commercetools.com",
  projectKey: "project-commercetools",
  credentials: {
    clientId: "xMIYaNPO9aJhIHETqgqH7kgl",
    clientSecret: "fjL2hpzGuUsdbo2Vz9qM74nMO9zaK8L4",
  },
  //   scopes,
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions = {
  host: "https://api.europe-west1.gcp.commercetools.com",
  fetch,
};

// Export the ClientBuilder
// export
const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  // .withLoggerMiddleware() // Include middleware for logging
  .build();

// Create apiRoot from the imported ClientBuilder and include your Project key
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: "project-commercetools",
});

// Example call to return Project information
// This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.

// Retrieve Project information and output the result to the log
// getProject().then(console.log).catch(console.error);

// const getProductsSDK = apiRoot.productProjections();

module.exports = apiRoot;
