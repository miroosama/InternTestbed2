const Web3 = require('web3');
const Tx = require('ethereumjs-tx');
var axios = require('axios');
const url = 'https://ropsten.infura.io/v3/13185919ce86442d9035a5424dccaa60'; //this is the Ropsten endpoint taken from Infura
const web3 = new Web3(url);
// const address = '0xfaa3ca002157629651ef65f304f98b46e7dc6ba8'; //this address is taken from https://etherscan.io
const address = '0xdA0233Dfc4eF02998dacd5E75EC835Af70c8b04e';

exports.web3Tx = (() => {
  return class {
    constructor() {

    }

    getBalance(address) {
      web3.eth.getBalance(address, (err, bal) => {
        console.log(web3.utils.fromWei(bal, 'ether'))
      });
    }

    makeTx(source, target, amount, prk) {
      web3.eth.getTransactionCount(source, (err, txCount) => {
        // Build the transaction: 
        const txObject = {
          nonce: web3.utils.toHex(txCount),
          to: target,
          value: web3.utils.toHex(web3.utils.toWei('0.5', 'ether')),
          gasLimit: web3.utils.toHex('21000'),
          gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
        }

        console.log(txObject)

        // Sign the transaction: 
        const tx = new Tx(txObject);
        tx.sign(prk)

        const serializedTransaction = tx.serialize();
        const raw = '0x' + serializedTransaction.toString('hex');

        // Broadcast the transaction: 
        web3.eth.sendSignedTransaction(raw, (err, txHash) => {
          console.log(raw)
          console.log('txHash:', txHash)
        })
      })
    }

  }
})();