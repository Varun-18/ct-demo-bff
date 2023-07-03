const apiRoot = require("../config");

/**
 *  This function return the suggestions
 * @param {string} keyword represents the keyword entred by the user
 * @returns an array of objects that contains suggestions (fuzzy search)
 */

const getSuggestions = async (keyword) => {
  try {
    const { body } = await apiRoot
      .productProjections()
      .suggest()
      .get({ queryArgs: { "searchKeywords.en": keyword } })
      .execute();

    return body["searchKeywords.en"];
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getSuggestions,
};
