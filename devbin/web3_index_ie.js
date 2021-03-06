const Web3 = require('web3');
const Tx = require('ethereumjs-tx');
var axios = require('axios');
const url = 'https://ropsten.infura.io/v3/13185919ce86442d9035a5424dccaa60'; //this is the Ropsten endpoint taken from Infura
const web3 = new Web3(url);

// These accounts were created with web3: 
const account1 = '0xdA0233Dfc4eF02998dacd5E75EC835Af70c8b04e';
const account2 = '0xf901367518aCE01dcE42afA84be17336f84A4f7c';
// This is a Metamask account: 
const account3 = '0xfaa3ca002157629651ef65f304f98b46e7dc6ba8';

const privateKey1 = Buffer.from('2d57ab0d19019456b496ac10ed9a9cf1ed73aaf4959c472362ef72b3ece435ad', 'hex');
const privateKey2 = Buffer.from('9c832f83963ac11986ef0f55a3a6e6e73a5eb24d9edff528eab71b1eb91f0542', 'hex');
// This is the Metamask account's private key:
const privateKey3 = Buffer.from('f78eced94575202245e06771316dfd26ee704df351790d322f156dace479bcfc', 'hex');

function getBalance(addr) {
  web3.eth.getBalance(addr, (err, bal) => {
    console.log('balance: ',
      web3.utils.fromWei(bal, 'ether'), 'ethers')
  })
}

function broadcastTransaction(sender, receiver, senderSignature, amount, gasLim, gasPr) {
  web3.eth.getTransactionCount(sender, (err, txCount) => {
    // Build the transaction: 
    const txObject = {
      nonce: web3.utils.toHex(txCount),
      to: receiver,
      value: web3.utils.toHex(web3.utils.toWei(amount, 'ether')),
      gasLimit: web3.utils.toHex(gasLim),
      gasPrice: web3.utils.toHex(web3.utils.toWei(gasPr, 'gwei'))
    }

    // console.log(txObject)

    // Sign the transaction: 
    const tx = new Tx(txObject);
    tx.sign(senderSignature)

    const serializedTransaction = tx.serialize();
    const raw = '0x' + serializedTransaction.toString('hex');

    // Broadcast the transaction: 
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
      // console.log(raw)
      console.log('txHash:', txHash)
    })
  })
}

broadcastTransaction(account3, account2, privateKey3, '0.5', '21000', '10');

// getBalance(account1);