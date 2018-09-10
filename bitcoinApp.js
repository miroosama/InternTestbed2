var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');
const request = require('request')
const axios = require('axios')

var network = bitcoin.networks.testnet;

function getMnemonic(str){
    return getSeed(str)
}

function getSeed(num){
    let seed = bip39.mnemonicToSeed(num);
   let root = getRoot(seed)
   return getNode(root, "false")
}

function getNewNode(str){
    let seed = bip39.mnemonicToSeed(str);
   let root = getRoot(seed)
   return getNode(root, "true")
}

function getRoot(seed){
    // var root = bitcoin.bip32.fromSeed(seed, network);
    return root = bitcoin.bip32.fromSeed(seed, network);
}
let counter = 0
function getNode(root, str){
    if(str == "true"){
        counter += 1
    var node = root.deriveHardened(44).deriveHardened(1).deriveHardened(0).derive(0).derive(counter)
    } else {
        var node = root.deriveHardened(44).deriveHardened(1).deriveHardened(0).derive(0).derive(0)
    }
    let prk = node.toWIF()
    return getAddress(node, network, prk)
}

function getAddress (node, network, prk) {
    console.log("HII",prk)
    return  bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address
}

function checkUTxO(addr){

let apiUrl = "https://api.blockcypher.com/v1/btc/test3/addrs/" + addr
console.log(apiUrl)
axios({
    url: apiUrl
  })
  .then(function (resp) {
    console.log("Balance: ", resp.data)
  })

}

checkUTxO("mpQCsG15rjAwA3mdfkyBnTenjD5zZdA5ws")
let mn = "pond number pioneer mango noise much want lab weapon vibrant option clutch girl baby love"
// function transactionBuilding(utxo, outputs, prk){

function transactionBuilding(utxo, send, sendAMT, changeAMT, prk, str){
 let transaction = new bitcoin.TransactionBuilder(network)
    transaction.addInput(utxo, 1)
    // for(let i = 0; i < outputs.length; i++){
    //     transaction.addOutput(outputs[i].address, outputs[i].amount)
    // }
    transaction.addOutput(send, sendAMT)
    transaction.addOutput(getNewNode(str), changeAMT)
    let keypairSpend = bitcoin.ECPair.fromWIF(prk, network)
    transaction.sign(0, keypairSpend)
    let tx = transaction.build()
    let txhex = tx.toHex();
    broadcastTx(txhex)
}
// utxo, outputs
function txForm(str){
   let newAdd = getNewNode(str)
   console.log()
}
//'https://api.blockcypher.com/v1/bcy/test/txs/push'
// https://chain.so/api/v2/send_tx/{NETWORK}

function broadcastTx(txhex){
    axios({
        method: 'post',
        url: `https://api.blockcypher.com/v1/bcy/test/txs/push`,
        data: {
            tx_hex: `${txhex}`
        }
      }).then(function(response) {
        console.log(response.data);
        console.log(response.status);
      }).catch(function(error){
          console.log(error)
      });
}
transactionBuilding('61ba161083ccd17a0743539e4ed55a312eb356567a403fea40da350f365be4b8', 'mmGR83JQaV5cFkNmG8TcWERTjPu69kK6J5', 4000, 962000, 'cTC5sLw9pqw3aa5UNrvpwc8JW3NS8SQNSQMgcFxXgEPUWVFhaCGq', mn)


// "966aa228397a9968894165d9adad2ced2d9492a178e6cd76401518dc2bfc5a5d"

// '61ba161083ccd17a0743539e4ed55a312eb356567a403fea40da350f365be4b8'
// mpQCsG15rjAwA3mdfkyBnTenjD5zZdA5ws
// // "mpQCsG15rjAwA3mdfkyBnTenjD5zZdA5ws"
// // HII cSRSxzdgMtwKztMT6mcPhNVXv1xS6SvxsYkHjuFuimJ3fw8E1T76
// 964000

//transactionBuilding('61ba161083ccd17a0743539e4ed55a312eb356567a403fea40da350f365be4b8', [{address: 'mmGR83JQaV5cFkNmG8TcWERTjPu69kK6J5', amount:960000}, {address:"mpQCsG15rjAwA3mdfkyBnTenjD5zZdA5ws" , amount: 2000}], 'cSRSxzdgMtwKztMT6mcPhNVXv1xS6SvxsYkHjuFuimJ3fw8E1T76')