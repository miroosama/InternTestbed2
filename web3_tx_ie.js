const Web3 = require('web3');
const ethereumjsTx = require('ethereumjs-tx');
var axios = require('axios');
const url = 'https://ropsten.infura.io/v3/13185919ce86442d9035a5424dccaa60'; //this is the Ropsten endpoint taken from Infura
const web3 = new Web3(url);

const run_web3 = require('./web3_ie_ie');

const account1 = '0xdA0233Dfc4eF02998dacd5E75EC835Af70c8b04e';
const account2 = '0xf901367518aCE01dcE42afA84be17336f84A4f7c';

const privateKey1 = Buffer.from('0x2d57ab0d19019456b496ac10ed9a9cf1ed73aaf4959c472362ef72b3ece435ad');
const privateKey2 = Buffer.from('0x9c832f83963ac11986ef0f55a3a6e6e73a5eb24d9edff528eab71b1eb91f0542');

console.log(run_web3)