var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');
const request = require('request');
const axios = 
let tx
let balance

var network = bitcoin.networks.testnet;

var mnemonic = "crisp real stone debris labor arrow seek conduct ozone science hat decrease"
var seed = bip39.mnemonicToSeed(mnemonic);

var root = bitcoin.bip32.fromSeed(seed, network);

const path = "m/44'/1'/0'/0/0"
const node = root.deriveHardened(44).deriveHardened(1).deriveHardened(0).derive(0).derive(0)

function getAddress(node, network) {
    return bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address
}

let addr = 'mr3Pon6aTEQa7XGUa7iuooJjHHy71jL4rn'
let apiUrl = 'https://testnet.blockexplorer.com/api/addr/'

    // log utxo
request.get(apiUrl + addr + '/utxo', (err, req, body) => {
    tx = JSON.parse(body)
    console.log(tx)
   }
)

// log balance
request.get(apiUrl + addr + '/balance', (err, req, body) => {
    balance = JSON.parse(body)
    console.log(balance))
 }
);

//utxo
[ { address: 'mr3Pon6aTEQa7XGUa7iuooJjHHy71jL4rn',
    txid:
     'b6e8b3adabdd043d530dfbc446b388d55625957308c89850ba37c59cdd41f321',
    vout: 0,
    scriptPubKey: '76a9147373088fcaf8e9ab1364f3580f31b904ea64a21c88ac',
    amount: 0.0003,
    satoshis: 30000,
    confirmations: 0,
    ts: 1536343448 } ]
    
    let transaction = new bitcoin.TransactionBuilder(network);
    let txid1 = 'f9acfccbee92232f20f2bd9e08ff096a40ea4cd500c7b3f7afbd03b37ed603a8'

    let amountWeHave = 30000
    let amountToKeep = 29000
    let transactionFee = 100

    let amountToSend = amountWeHave - amountToKeep - transactionFee

    //input
    tx.addInput(txid1, 0); 

    //output
    tx.addOutput("mmGR83JQaV5cFkNmG8TcWERTjPu69kK6J5", amountToSend);
    tx.addOutput("mr3Pon6aTEQa7XGUa7iuooJjHHy71jL4rn", amountToKeep);

    let WIF = node.toWIF()
    let signature = bitcoin.ECPair.fromWIF(WIF, network);
    
    tx.sign(0, signature)

    let transaction = tx.build()
    let txhex = transaction.toHex();


    console.log('our beautiful transaction:', txhex)

        // axios.post('https://api.blockcypher.com/v1/bcy/test/txs/push', { tx: ${txhex} } )
        //   .then(function(res) { console.log(res) })
        //   .catch( (err) => { console.log(err) } )




