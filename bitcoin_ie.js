var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');
var request = require('request');
var axios = require('axios');
// const funcs = require('./bitcoin_gray.js');

var network = bitcoin.networks.testnet;

var mnemonic = "maple give attract network afraid clog rocket mirror increase outdoor curious suffer bamboo matter ramp";
var seed = bip39.mnemonicToSeed(mnemonic);

var Tree = bitcoin.bip32.fromSeed(seed, network);
var Leaf = Tree.deriveHardened(44).deriveHardened(1).deriveHardened(0).derive(0).derive(0);

function getAddress(node, network) {
  return bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network
  }).address
}

// function getAddress(node) {
//   var publicKeyHash = bitcoin.crypto.hash160(node.publicKey);
//   return bitcoin.address.toBase58Check(publicKeyHash, network.pubKeyHash);
// }

function getPublicKey(node) {
  return node.publicKey.hexSlice();
}

function getPrivateKey(node) {
  return node.toWIF();
}

// function checkBalance(addr) {
//   let apiUrl = 'https://testnet.blockexplorer.com/api/addr/';
//   request.get(apiUrl + addr + '/utxo', (err, req, body) => {
//     console.log(JSON.parse(body));
//   });
//   request.get(apiUrl + addr + '/balance', (err, req, body) => {
//     console.log(JSON.parse(body));
//   });
// }

function checkBalance(addr) {
  const url = "https://api.blockcypher.com/v1/btc/test3/addrs/" + addr;
  return axios({
      url: url
    }).then(function (resp) {
      // console.log(resp.data);
      // console.log("Balance: ", resp.data.final_balance);
      return ("Balance: ", resp.data.final_balance);
    })
    .catch((err) => console.log(err));
}

// console.log(checkBalance("mneSrzhURsCs3JYdxakDdcBqbF9y1XCEZq"));

function createTx(vout, total, WIF, inputId, output1, output2, index) {
  const change = total - vout;
  const txb = new bitcoin.TransactionBuilder(network);
  txb.addInput(inputId, index);
  txb.addOutput(output1, vout);
  txb.addOutput(output2, change);
  const keypairSpend = bitcoin.ECPair.fromWIF(WIF, network);
  txb.sign(0, keypairSpend);
  const tx_hex = txb.build().toHex();
  return tx_hex;
}

function pushTx(tx) {
  axios.post('https://api.blockcypher.com/v1/bcy/test/txs/push', JSON.stringify({
      tx: tx
    }))
    .then(resp => console.log(resp))
    .catch(err => console.log(err))
}

// pushTx(createTx(15000, 20000, "cN66Qp23DXb2x9s7aXs7So31z9ZBHW8NZcvUjBHfmGWZsxtqnRia", '40181e4293ccc0148a16bb26bd91711cf24042c931780d3a742fe823e722189c', "mmGR83JQaV5cFkNmG8TcWERTjPu69kK6J5", "mneSrzhURsCs3JYdxakDdcBqbF9y1XCEZq", 0));

// var WIF = "cNVu4ia2waxd7qb6LNauU9haMG9bd5JCRCpferBN9Lq4uZgjLNch";
// var txb = new bitcoin.TransactionBuilder(network);
// txb.addInput("107be8e4c1031b1527a4fd518a25e394a12f13245a41436db10612020271a672", 0);
// txb.addOutput("mgZ8bRtxoMaRKaemwbv99EooWZdt2CMy8u", 1000);
// txb.addOutput("mgTaJF2s7x8QdLUN91YGFCg134UwG121io", 800);
// let keypairSpend = bitcoin.ECPair.fromWIF(WIF, network);
// txb.sign(0, keypairSpend);

// let tx_hex = txb.build().toHex();
// console.log("Hello!!!", tx_hex);


var mnemonic = bip39.generateMnemonic(256);

// console.log(mnemonic);


// console.log(getPublicKey(Leaf));
// console.log(getPrivateKey(Leaf));
// console.log(getAddress(Leaf, network));



// console.log(Leaf.getAddress());
//Next get the private key
//var Leaf2 = node.deriveHardened(44).deriveHardened(1).deriveHardened(0);

//https://coinomi.com/recovery-phrase-tool.html
//https://iancoleman.io/bip39/ 

async function checkBalanceHandler() {
  let data = await checkBalance("mneSrzhURsCs3JYdxakDdcBqbF9y1XCEZq");
  // console.log(data)
  return data;
}
// console.log(checkBalanceHandler())

module.exports.balance = checkBalance("mneSrzhURsCs3JYdxakDdcBqbF9y1XCEZq");

module.exports.handler = checkBalanceHandler();
module.exports.public = getPublicKey(Leaf);

module.exports.add = (a, b) => a + b;