var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');
var request = require('request');
var axios = require('axios');

var network = bitcoin.networks.testnet;

// function checkBalance(addr) {
//   let apiUrl = 'https://testnet.blockexplorer.com/api/addr/';
//   request.get(apiUrl + addr + '/utxo', (err, req, body) => {
//     console.log(JSON.parse(body));
//   });
//   request.get(apiUrl + addr + '/balance', (err, req, body) => {
//     console.log(JSON.parse(body));
//   });
// }

// console.log(checkBalance("mgTaJF2s7x8QdLUN91YGFCg134UwG121io"));

function checkBalance(addr) {
  const url = "https://api.blockcypher.com/v1/btc/test3/addrs/" + addr
  axios({
      url: url
    })
    .then(function (resp) {
      console.log("Balance: ", resp.data.final_balance)
    })
}

// console.log(checkBalance("mgTaJF2s7x8QdLUN91YGFCg134UwG121io"));

function createTx(vout, total, WIF, inputId, output1, output2, index) {
  const change = total - vout;
  const txb = new bitcoin.TransactionBuilder(network);
  txb.addInput(inputId, index);
  txb.addOutput(output1, vout);
  txb.addOutput(output2, change);
  const keypairSpend = bitcoin.ECPair.fromWIF(WIF, network);
  txb.sign(0, keypairSpend);
  const tx_hex = txb.build().toHex();
  console.log(tx_hex);
  return tx_hex;
}

// console.log(createTx(1400, 1800, "cNVu4ia2waxd7qb6LNauU9haMG9bd5JCRCpferBN9Lq4uZgjLNch", '796c2c99b6d452769743942fd786d86d563d97af15fc53d2546175e98bf91c50', "mgZ8bRtxoMaRKaemwbv99EooWZdt2CMy8u", "mgTaJF2s7x8QdLUN91YGFCg134UwG121io", 0));

function pushTx(tx) {
  axios.post('https://api.blockcypher.com/v1/bcy/test/txs/push', JSON.stringify({
      tx: tx
    }))
    .then(resp => console.log(resp))
    .catch(err => console.log(err))
}

pushTx(createTx(1400, 1800, "cNVu4ia2waxd7qb6LNauU9haMG9bd5JCRCpferBN9Lq4uZgjLNch", '796c2c99b6d452769743942fd786d86d563d97af15fc53d2546175e98bf91c50', "mgZ8bRtxoMaRKaemwbv99EooWZdt2CMy8u", "mgTaJF2s7x8QdLUN91YGFCg134UwG121io", 0));

checkBalance("mgTaJF2s7x8QdLUN91YGFCg134UwG121io");