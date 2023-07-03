const apiRoot = require("../config"); // commerce tools api client for mobile and SPA
const { v4: uuidv4 } = require("uuid");

/**
 * return the products that are showcased by default without any searched keyword
 * @param {int} page defines the page that requested by the user
 * @returns list of producst for a page index
 */

const getProductsService = async (page) => {
  const { body } = await apiRoot
    .productProjections()
    .get({ queryArgs: { offset: page } })
    .execute();

  body.results.map((item) => {
    item.masterVariant.id = uuidv4(); // assigned a new unique id to avoid caching by graphQL
    return item;
  });

  return body;
};

/**
 * Resturn the products matching the keywords entered by the user
 * @param {string} searched  The keyword serached by the end user
 * @param {*} page  The page for the searched product
 * @returns the list of products related to searched by the end user
 */

const getProductsByKeyword = async (searched, page) => {
  const { body } = await apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        fuzzy: true,
        "text.en": `${searched}`,
        offset: page,
      },
    })
    .execute();

  body.results.map((item) => {
    item.masterVariant.id = uuidv4();
    return item;
  });

  return body;
};

/**
 * used for fetching the products deatils
 * @param {id} id the id of the product that the user wishes to view in deatil
 * @returns all the data of the product of  a particular id
 */

const getProducstById = async (id) => {
  try {
    const { body } = await apiRoot
      .productProjections()
      .withId({ ID: id })
      .get()
      .execute();

    body.masterVariant.id = uuidv4();
    return body;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProductsService,
  getProductsByKeyword,
  getProducstById,
};
