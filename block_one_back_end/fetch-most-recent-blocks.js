const fetch = require("node-fetch");
const axios = require("axios");
const { Api, JsonRpc, RpcError } = require("eosjs");
const { JsSignatureProvider } = require("eosjs/dist/eosjs-jssig");
const { TextEncoder, TextDecoder } = require("util");
const { NODE_ENV, EOS_ENDPOINT, EOS_PRIVATE_KEY } = require("./config");
const { blocks } = require("../block_one_front_end/tests/unit/blocks.fixtures");

const signatureProvider = new JsSignatureProvider([EOS_PRIVATE_KEY]);
const rpc = new JsonRpc(EOS_ENDPOINT, { fetch });
const api = new Api({
  rpc,
  signatureProvider,
  textDecoder: new TextDecoder(),
  textEncoder: new TextEncoder()
});

const makeAxiosCall = ({ method, data = {}, urlEnding }) => {
  return axios({
    method,
    headers: {
      "content-type": "application/json"
    },
    data: JSON.stringify(data),
    url: EOS_ENDPOINT + urlEnding
  }).then(res => res.data);
};

const getApiCalls = () => {
  let getBlock, getInfo;
  if (NODE_ENV === "LOCAL_AXIOS") {
    getInfo = () =>
        makeAxiosCall({ method: "GET", urlEnding: "/v1/chain/get_info" });
    getBlock = block_num_or_id =>
        makeAxiosCall({
          method: "POST",
          urlEnding: "/v1/chain/get_block",
          data: { block_num_or_id }
        });
  } else if (NODE_ENV === "LOCAL_MOCK") {
    getInfo = () => ({ head_block_num: blocks[0].block_num });
    getBlock = async block_num_or_id => {
      const block = blocks.find(block => block.block_num === block_num_or_id);
      return new Promise(resolve => setTimeout(() => resolve(block), 3000));
    };
  } else {
    getInfo = () => rpc.get_info();
    getBlock = block_num_or_id => api.rpc.get_block(block_num_or_id);
  }
  return { getInfo, getBlock };
};

module.exports = async numBlocks => {
  const { getInfo, getBlock } = getApiCalls();
  try {
    const { head_block_num } = await getInfo();
    const blockPromises = [];
    let i = 0;
    while (i < numBlocks) {
      const blockNum = head_block_num - i;
      blockPromises.push(getBlock(blockNum));
      i++;
    }
    return await Promise.all(blockPromises);
  } catch (err) {
    if (err instanceof RpcError) {
      console.error(JSON.stringify(err.json, null, 2));
    } else {
      console.error(err);
    }
    throw err;
  }
};
