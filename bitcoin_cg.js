//require bip39, 'mnemonic code for generating deterministic keys' - .generateMnemonic(), mnemonicToSeed()
var bip39 = require('bip39');

//require bitcoin, bip32 is accessible through it (what other bips?)
var bitcoin = require('bitcoinjs-lib');

//require request, it is a way to make HTTP calls
//request( url, function (error, response, body) {
    //can print error, if one occurred
    //response is the status code
    //body is the HTML of the url we are requesting
//}
const request = require('request');

var network = bitcoin.networks.testnet;

//.generateMnemonic() will create a new Mnemonic everytime. this is the beginning of the 'account?' Cannot create a mnemonic on your own, because the last value is a checksum
var mnemonic = "crisp real stone debris labor arrow seek conduct ozone science hat decrease"
//we pass in the mnemonic into bip39.mnemonicToSeed(),
var seed = bip39.mnemonicToSeed(mnemonic);

var root = bitcoin.bip32.fromSeed(seed, network);

const path = "m/44'/1'/0'/0/0"
const node = root.deriveHardened(44).deriveHardened(1).deriveHardened(0).derive(0).derive(0)

function getAddress(node, network) {
    return bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address
}

let addr =  'mgTaJF2s7x8QdLUN91YGFCg134UwG121io'
let myaddr = 'mxJHejkmYcwc22iSpZEVfiAtFdkxx3PviN'
let apiUrl = 'https://testnet.blockexplorer.com/api/addr/'

    // log unspent transactions -- account as it stands
request.get(apiUrl + addr + '/utxo', (err, req, body) => {
    console.log(JSON.parse(body))
   }
);


const end = "end"



// // log balance
// request.get(apiUrl + addr + '/balance', (err, req, body) => {
//   console.log(JSON.parse(body))
//  }
// );


    // // { txid: '107be8e4c1031b1527a4fd518a25e394a12f13245a41436db10612020271a672',
    // // vout: 0,
    // // satoshis: 1800 }

    // let tx = new bitcoin.TransactionBuilder(network);
    // let input1 = 'f9acfccbee92232f20f2bd9e08ff096a40ea4cd500c7b3f7afbd03b37ed603a8'
    // //1800 satoshis
    // let input2 = 'd3b9e066894abb4e3cbf53890fb131ed9977126afb079f64db5efbb2aac0817b';
    // //1907 satoshis

    // let amountWeHave = 1907
    // let amountToKeep = 1500
    // let transactionFee = 100

    // let amountToSend = amountWeHave - amountToKeep - transactionFee

    // //input
    // tx.addInput(t4, 0); 

    // //output
    // tx.addOutput("msTeEpLKa4dKbFj5WUQ962Tu7bWyQjM6wS", amountToSend);
    // tx.addOutput("mgTaJF2s7x8QdLUN91YGFCg134UwG121io", amountToKeep);

    // let WIF = node.toWIF()
    // let signature = bitcoin.ECPair.fromWIF(WIF, network);
    
    // tx.sign(0, signature)

    // let transaction = tx.build()
    // let txhex = transaction.toHex();


    // console.log('our beautiful transaction:', txhex)

    // // request({
    // //     url: 'https://testnet.blockexplorer.com/api/tx/send',
    // //     method: "POST",
    // //     json: true,
    // //     body: `${txhex}`
    // // }, function (error, response, body){
    // //     console.log(response);
    // // });




