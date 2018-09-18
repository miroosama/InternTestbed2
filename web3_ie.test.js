const Web3 = require('web3');
const ethereumjsTx = require('ethereumjs-tx');
var axios = require('axios');
const url = 'https://ropsten.infura.io/v3/13185919ce86442d9035a5424dccaa60'; //this is the Ropsten endpoint taken from Infura
const web3 = new Web3(url);
const address = '0xfaa3ca002157629651ef65f304f98b46e7dc6ba8'; //this address is taken from https://etherscan.io

const {
  getBalance
} = require("./web3_ie");

test("getBalance returns a promise that can be resolved", () => {
  return getBalance(address).then(resp => {
    expect(resp).toEqual({
      "balance": "5.49895"
    })
  })
})