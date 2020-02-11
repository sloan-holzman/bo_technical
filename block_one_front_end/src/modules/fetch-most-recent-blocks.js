const axios = require("axios");

module.exports = async numBlocks => {
  return axios({
    method: "GET",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*"
    },
    url: `http://localhost:3030/fetchMostRecent?numBlocks=${numBlocks}`
  });
};
