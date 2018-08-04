import Web3 from 'web3';
import { contractPromisify } from './utils';

const tokenAbi = require('./abi/Token.json');
const engineAbi = require('./abi/NanoLoanEngine.json');
const extensionAbi = require('./abi/NanoLoanEngineExtension.json');
const oracleAbi = require('./abi/Oracle.json');


const config = {
  contracts: {
    rcnToken: '0x2f45b6fb2f28a73f110400386da31044b2e953d4',
    basaltEngine: '0xbee217bfe06c6faaa2d5f2e06ebb84c5fb70d9bf',
    engineExtension: '0x3b86e29fc3e8a626735b0194aef13c6051eb6c84',
    decentraland: {
      mortgageCreator: '0x2bdf545935d4264cbb7457e97d69b6b86458eb64',
      mortgageManager: '0xea06746f1bd82412f9f243f6bee0b8194d67a67d',
      landMarket: '0x80faa2b517b84a5aec1078d3600eab4c0b3aff56',
    },
  },
};


const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.node.rcn.loans:8545/'));

/*
const rcnExtension = new web3.eth.Contract(extensionAbi.abi, config.contracts.engineExtension);
rcnExtension.methods.queryLoans(config.contracts.basaltEngine, 0, 10, [filters[0]], params).call().then(console.log);
const rcnContract = new web3.eth.Contract(tokenAbi.abi, config.contracts.rcnToken);
const rcnEngine = new web3.eth.Contract(engineAbi.abi, config.contracts.basaltEngine);
const rcnExtension = new web3.eth.Contract(extensionAbi.abi, config.contracts.engineExtension);
*/

const rcnContract = web3.eth.contract(tokenAbi.abi).at(config.contracts.rcnToken);
const rcnEngine = web3.eth.contract(engineAbi.abi).at(config.contracts.basaltEngine);
const rcnExtension = web3.eth.contract(extensionAbi.abi).at(config.contracts.engineExtension);


function addressToBytes32(address) {
  return `0x000000000000000000000000${address.replace('0x', '')}`;
}

function loanFromBytes(engine, id, loanBytes) {
  return {
    engine,
    id,
    oracle: addressToBytes32(loanBytes[1]),
    statusFlag: parseInt(loanBytes[14], 16),
    borrower: addressToBytes32(loanBytes[2]),
    creator: addressToBytes32(loanBytes[4]),
    rawAmount: parseInt(loanBytes[5], 16),
    duration: parseInt(loanBytes[12], 16),
    rawAnnualInterest: parseInt(loanBytes[9], 16),
    rawAnnualPunitoryInterest: parseInt(loanBytes[10], 16),
    currencyRaw: loanBytes[16],
    rawPaid: parseInt(loanBytes[8], 16),
    cumulatedInterest: parseInt(loanBytes[18], 16),
    cumulatedPunnitoryInterest: parseInt(loanBytes[6], 16),
    interestTimestamp: parseInt(loanBytes[7], 16),
    dueTimestamp: parseInt(loanBytes[11], 16),
    lenderBalance: parseInt(loanBytes[15], 16),
    owner: addressToBytes32(loanBytes[0]),
    cosigner: addressToBytes32(loanBytes[3]),
  };
}


function parseLoansBytes(bytes) {
  const loans = [];
  const total = bytes.length / 20;
  for (let i = 0; i < total; i += 1) {
    const id = parseInt(bytes[(i * 20) + 19], 16);
    const loanBytes = bytes.slice(i * 20, (i * 20) + 20);
    loans.push(loanFromBytes(config.contracts.basaltEngine, id, loanBytes));
  }
  return loans;
}


const { queryLoans /* , getLoan */ } = contractPromisify(rcnExtension);
const { balanceOf } = contractPromisify(rcnContract);

export async function getUserBalanceRCNWei() {
  const account = await web3.getAccount();
  return balanceOf(account);
}

export async function getUserBalanceRCN() {
  const balance = await getUserBalanceRCNWei();
  return web3.fromWei(balance);
}


export async function getOpenLoans() {
  // Filter open loans, nonexpired loand and valid mortgage
  const filters = {
    openloans: '0x3e703de416a62525c8653be11d71486550618ec8',
    nonexpired: '0xe084b7cf7f6869a96cd72962047bf65e6d55e1e1',
    validmortgage: '0x0bc0ac0f08235979951bb155d15f1a08dd7dcb2a',
  };

  const params = ['0x00', '0x00', addressToBytes32(config.contracts.decentraland.mortgageCreator)];
  const results = await queryLoans(config.contracts.basaltEngine, 0, 10, [filters.openloans], params);
  return results.map(parseLoansBytes);
}


export async function getLoansOfLender(lender) {
  // Filter [lenderIn]
  const filters = ['0xe52eac8af912b8b3196b2921f12b66c91b39e025'];
  const params = [addressToBytes32(lender)];
  const results = queryLoans(config.contracts.basaltEngine, 0, 0, filters, params);
  return results.map(parseLoansBytes);
}
