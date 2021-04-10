require('dotenv').config();
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const CONTRACT_NAME = 'auction-engine';
const FUNCTION_NAME = 'close-auction';
const tx = require('@stacks/transactions');
const utils = require('./utils');
const network = utils.resolveNetwork();

const auctionId = process.argv.slice(2)[0];
console.log('Trying to end auction with ID', auctionId);

const txOptions = {
  contractAddress: CONTRACT_ADDRESS,
  contractName: CONTRACT_NAME,
  functionName: FUNCTION_NAME,
  functionArgs: [tx.uintCV(auctionId)],
  senderKey: process.env.STACKS_PRIVATE_KEY,
  postConditionMode: 1,
  network
};

async function transact() {
  const transaction = await tx.makeContractCall(txOptions);
  const result = tx.broadcastTransaction(transaction, network);
  await utils.processing(result, transaction.txid(), 0);
};

transact();
