// ENV
require('dotenv').config();

const {
  NODE_ENV
} = process.env;

// const localEndpoint = "https://api.eosnewyork.io";
const localEndpoint = "https://node1.zbeos.com";

let EOS_ENDPOINT, EOS_PRIVATE_KEY;

switch (NODE_ENV) {
  case 'PRODUCTION':
    EOS_ENDPOINT = process.env.EOS_DEV_ENDPOINT;
    EOS_PRIVATE_KEY = process.env.EOS_DEV_PRIVATE_KEY;
    break;
  default:
    EOS_ENDPOINT = process.env.EOS_PRODUCTION_ENDPOINT || localEndpoint;
    EOS_PRIVATE_KEY = process.env.EOS_PRODUCTION_PRIVATE_KEY || "5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr";
    break;
}

module.exports = {
  NODE_ENV,
  EOS_ENDPOINT,
  EOS_PRIVATE_KEY
};
