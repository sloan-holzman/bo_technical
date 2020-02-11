const { Api, JsonRpc } = require("eosjs");
const { JsSignatureProvider } = require("eosjs/dist/eosjs-jssig");
const fetch = require("node-fetch");

// NOTE: use only for local development; use env variable in production
const defaultPrivateKey = "5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr";
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
const rpc = new JsonRpc("https://node1.zbeos.com", { fetch });
const api = new Api({ rpc, signatureProvider });

module.exports = async numBlocks => {
  const { head_block_num } = await api.rpc.get_info();
  const blockPromises = [];
  let i = 0;
  while (i < numBlocks) {
    blockPromises.push(rpc.get_block(head_block_num - i));
    i++;
  }
  return Promise.all(blockPromises);
};
