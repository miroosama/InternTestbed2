const Web3 = require('web3');
var axios = require('axios');
const ethereumjsTx = require('ethereumjs-tx');

const url = 'http://127.0.0.1:7545'; //this is the local RPC server address
const web3 = new Web3(url);

const address1 = '0xfD0afBbcb5B550c1b4a754dE2110a70F45B9C646';
const address2 = '0x3ffCE0693c6C1B9d25319F0B0d2f9372123707a5';

function getBalance(addr) {
  return new Promise((resolve, reject) => {
    web3.eth.getBalance(addr, (err, bal) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          balance: web3.utils.fromWei(bal, 'ether')
        });
      }
    });
  });
}

async function asyncLog(promise) {
  console.log(await promise);
}

function sendTx(add1, add2) {
  web3.eth.sendTransaction({
    from: add1,
    to: add2,
    value: web3.utils.toWei('1', 'ether')
  });
}

sendTx(address1, address2);

asyncLog(getBalance(address2));

// web3.utils.fromWei(bal, 'ether')

// function getBalance(addr) {
//   web3.eth.getBalance(address, (err, bal) => {
//     console.log(balance = web3.utils.fromWei(bal, 'ether'));
//   });
// }