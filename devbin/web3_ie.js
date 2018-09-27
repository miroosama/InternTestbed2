const Web3 = require('web3');
const ethereumjsTx = require('ethereumjs-tx');
var axios = require('axios');
const url = 'https://ropsten.infura.io/v3/13185919ce86442d9035a5424dccaa60'; //this is the Ropsten endpoint taken from Infura
const web3 = new Web3(url);
// const address = '0xfaa3ca002157629651ef65f304f98b46e7dc6ba8'; //this address is taken from https://etherscan.io
const address = '0xdA0233Dfc4eF02998dacd5E75EC835Af70c8b04e';

// function getBalance(addr) {
//   return new Promise((resolve, reject) => {
//     web3.eth.getBalance(addr, (err, bal) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve({
//           balance: web3.utils.fromWei(bal, 'ether')
//         });
//       }
//     });
//   });
// }

// async function asyncLog(promise) {
//   console.log(await promise);
// }

// function createAccount() {
//   return web3.eth.accounts.create();
// }


// console.log(createAccount());
asyncLog(getBalance(address));


function getBalance(addr) {
  web3.eth.getBalance(address, (err, bal) => {
    console.log(balance = web3.utils.fromWei(bal, 'ether'));
  });
}

// 0x53d284357ec70cE289D6D64134DfAc8E511c8a3D

module.exports = {
  getBalance
};