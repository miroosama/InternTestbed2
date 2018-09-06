var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');
const request = require('request')
const axios = require('axios')

var mnemonic = "charge point slender artist gravity turn business remember provide increase nerve rich artist drastic orange"

var network = bitcoin.networks.testnet;

var seed = bip39.mnemonicToSeed(mnemonic);

var root = bitcoin.bip32.fromSeed(seed, network);

const node = root.deriveHardened(44).deriveHardened(1).deriveHardened(0).derive(0).derive(0)

console.log(node.toWIF())

console.log(getAddress(node, network));

function getAddress (node, network) {

    return bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address
}
let transactionFee = 1000
let amountWeHave = 22000
let amountToKeep = 15000
let amountToSend = amountWeHave - amountToKeep - transactionFee
let transaction = new bitcoin.TransactionBuilder(network)
transaction.addInput('ebdf6971f3b09b565dc3cc11e0b3ea97c187912107d453dff07095dbd327fe20', 1)

transaction.addOutput("mgZ8bRtxoMaRKaemwbv99EooWZdt2CMy8u", 1000)
transaction.addOutput("msTeEpLKa4dKbFj5WUQ962Tu7bWyQjM6wS", 10500)

let WIF = "cTgK1PJEvGRT1EJMNib1dEJ7V2o9ZhDoivHqD8Rrv6FXx6aTQkwL";

let apiUrl = 'https://testnet.blockexplorer.com/api/addr/';
let addr = 'msTeEpLKa4dKbFj5WUQ962Tu7bWyQjM6wS';
// let apiURL = 'https://api.blockcypher.com/v1/btc/main/txs/'
// log unspent transactions


//   request.get(apiUrl + addr + '/utxo', (err, req, body) => {
//     console.log(JSON.parse(body))
//    }
//   );
//   // log balance
  
//   request.get(apiUrl + addr + '/balance', (err, req, body) => {
//     console.log(JSON.parse(body))
//    }
//   );


let keypairSpend = bitcoin.ECPair.fromWIF(WIF, network)
transaction.sign(0, keypairSpend)

let tx = transaction.build()
let txhex = tx.toHex();
console.log(txhex)

// [ { address: 'msTeEpLKa4dKbFj5WUQ962Tu7bWyQjM6wS',
//     txid:
//      'b24731b15ed818e92efbdf8090b82fb6437a3f7799418a782658af22088a2ae6',
//     vout: 1,
//     scriptPubKey: '76a914830130751a4c3bb56f6c502c1fb0844444a16c3c88ac',
//     amount: 0.000145,
//     satoshis: 14500,
//     height: 1412483,
//     confirmations: 31 },
//   { address: 'msTeEpLKa4dKbFj5WUQ962Tu7bWyQjM6wS',
//     txid:
//      '32e329573e05f00631ae97b4c64bef2aa58c800b9fb92d40621901ba16d8fd4d',
//     vout: 1,
//     scriptPubKey: '76a914830130751a4c3bb56f6c502c1fb0844444a16c3c88ac',
//     amount: 0.00002,
//     satoshis: 2000,
//     height: 1412433,
//     confirmations: 81 } ]

// 16500


// [ { address: 'msTeEpLKa4dKbFj5WUQ962Tu7bWyQjM6wS',
//     txid:
//      'ebdf6971f3b09b565dc3cc11e0b3ea97c187912107d453dff07095dbd327fe20',
//     vout: 1,
//     scriptPubKey: '76a914830130751a4c3bb56f6c502c1fb0844444a16c3c88ac',
//     amount: 0.00013,
//     satoshis: 13000,
//     confirmations: 0,
//     ts: 1536244707 },
//   { address: 'msTeEpLKa4dKbFj5WUQ962Tu7bWyQjM6wS',
//     txid:
//      '32e329573e05f00631ae97b4c64bef2aa58c800b9fb92d40621901ba16d8fd4d',
//     vout: 1,
//     scriptPubKey: '76a914830130751a4c3bb56f6c502c1fb0844444a16c3c88ac',
//     amount: 0.00002,
//     satoshis: 2000,
//     height: 1412433,
//     confirmations: 95 } ]


// request({
//     url: 'https://testnet.blockexplorer.com/api/tx/send',
//     method: "POST",
//     json: true,   
//     body: `${txhex}`
// }, function (error, response, body){
//     console.log(response);
// });

let txsend = {
    tx: txhex
}
axios({
    method: 'post',
    url: 'https://api.blockcypher.com/v1/bcy/test/txs/push',
    data: {
        tx: `${txhex}`
    }
  }).then(function(response) {
    console.log(response.data);
    console.log(response.status);
  }).catch(function(error){
      console.log(error)
  });

//   request({
//     url: 'https://api.blockcypher.com/v1/bcy/test/txs/push',
//     method: "POST",
//     json: true,   
// body: JSON.stringify(txhex)
// }, function (error, response, body){
//     console.log(response);
// });

// axios.post('https://api.blockcypher.com/v1/bcy/test/txs/push', JSON.stringify(txsend))
//   .then(function(d) {console.log(d)}).catch(err =>{console.log(err)})
