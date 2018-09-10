const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');
const axios = require('axios');

const network = bitcoin.networks.testnet; // bitcoin.networks.bitcoin for mainnet

exports.getAddress = function (node, network) {
    // var publicKeyHash = bitcoin.crypto.hash160(node.publicKey);
    // return bitcoin.address.toBase58Check(publicKeyHash, network.pubKeyHash);
    return bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address
}

exports.getPublicKey = function (node){
    return node.publicKey.hexSlice()
}

exports.getPrivateKey = function (node) {
    return node.toWIF()
}

exports.checkBalance = async function (addr) {
    const url = "https://api.blockcypher.com/v1/btc/test3/addrs/" + addr
    return axios({url: url})
    .then( (resp) => {
        return { 
            balance: resp.data.balance,
            unconfirmed_balance: resp.data.unconfirmed_balance,
            final_balance: resp.data.final_balance
        }
    })
    .catch( (err) => console.log(err))     
}

exports.createTX = function (vout, balance, WIF, input1, output1, output2, type) {
    const change = balance - vout;
    const txb = new bitcoin.TransactionBuilder(network);
    txb.addInput(input1, type);
    txb.addOutput(output1, vout);
    txb.addOutput(output2, change);
    const keyPairSpend = bitcoin.ECPair.fromWIF(WIF, network);
    txb.sign(0, keyPairSpend);
    const txHex = txb.build().toHex();
    // console.log("transaction hex: ", txHex)
    return txHex;
}

exports.pushTX = function (tx) {
      axios.post('https://chain.so/api/v2/send_tx/BTCTEST', { tx_hex: tx } )
        .then(function(d) { console.log(d) })
        .catch( (err) => { console.log(err) } )
}

exports.promiseLog = async (promise) => {
    // accepts async promises as input, will wait until promise is fulfilled then print. forces console.log() into synchronous behavior.
    console.log(await promise)
}

// checkBalance(getAddress(Leaf, network))
// console.log("Public Key: ", getPublicKey(Leaf))
// console.log("Private Key: ", getPrivateKey(Leaf))
// console.log("Address: ", getAddress(Leaf, network))
// pushTX(createTX(200, 1200, `cRyUBkZgD44iSxw844fAB2RnfnW3H7XencuEwbuUk1iXJ2Xw2sT6`, `ebdf6971f3b09b565dc3cc11e0b3ea97c187912107d453dff07095dbd327fe20`, `msTeEpLKa4dKbFj5WUQ962Tu7bWyQjM6wS`, `mgZ8bRtxoMaRKaemwbv99EooWZdt2CMy8u`, 0))

// Compare with:
//https://coinomi.com/recovery-phrase-tool.html
//https://iancoleman.io/bip39/