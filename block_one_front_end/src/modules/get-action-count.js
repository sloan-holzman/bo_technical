const { get } = require("lodash");

module.exports = block => {
  return block.transactions.reduce((acc, transaction) => {
    return acc + get(transaction, "trx.transaction.actions.length", 0);
  }, 0);
};
