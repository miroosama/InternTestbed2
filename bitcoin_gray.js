const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');
const axios = require('axios');

const network = bitcoin.networks.testnet; // bitcoin.networks.bitcoin for mainnet
const mnemonic = "column capable stage auto obey twist bring correct crunch act penalty seminar goddess cage inflict pig route fence example cannon fragile puppy actual hedgehog";
const seed = bip39.mnemonicToSeed(mnemonic);
const root = bitcoin.bip32.fromSeed(seed, network);

// HDNode was deprecated: https://github.com/bitcoinjs/bitcoinjs-lib/issues/1206
// and https://github.com/bitcoinjs/bitcoinjs-lib/issues/1047

const Tree = bitcoin.bip32.fromSeed(seed, network);
const Leaf = Tree.deriveHardened(44).deriveHardened(1).deriveHardened(0).derive(0).derive(0);
const Leaf2 = Tree.deriveHardened(44).deriveHardened(1).deriveHardened(0);
let txb = new bitcoin.TransactionBuilder()

function getAddress(node, network) {
    // var publicKeyHash = bitcoin.crypto.hash160(node.publicKey);
    // return bitcoin.address.toBase58Check(publicKeyHash, network.pubKeyHash);
    return bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address
}

function getPublicKey(node){
    return node.publicKey.hexSlice()
}

function getPrivateKey(node){
    return node.toWIF()
}

function checkBalance(addr){
    const url = "https://api.blockcypher.com/v1/btc/test3/addrs/" + addr
    axios({url: url})
    .then( (resp) => {
        console.log( "Balance: ", resp.data.balance);
        console.log( "Unconfirmed Balance: ", resp.data.unconfirmed_balance);
        console.log( "Final Balance: ", resp.data.final_balance);
        // console.log( "transactions: ", resp.data);
    })     
}

function createTX(vout, balance, WIF, input1, output1, output2, type) {
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
function pushTX(tx) {
      axios.post('https://api.blockcypher.com/v1/bcy/test/txs/push', JSON.stringify({ tx: tx }) )
        .then(function(d) {console.log(d)})
        .catch( (err) => { console.log(err) } )
}

checkBalance(getAddress(Leaf, network))
console.log("Public Key: ", getPublicKey(Leaf))
console.log("Private Key: ", getPrivateKey(Leaf))
console.log("Address: ", getAddress(Leaf, network))
pushTX(createTX(200, 1200, `cRyUBkZgD44iSxw844fAB2RnfnW3H7XencuEwbuUk1iXJ2Xw2sT6`, `ebdf6971f3b09b565dc3cc11e0b3ea97c187912107d453dff07095dbd327fe20`, `msTeEpLKa4dKbFj5WUQ962Tu7bWyQjM6wS`, `mgZ8bRtxoMaRKaemwbv99EooWZdt2CMy8u`, 0))

// Compare with:
//https://coinomi.com/recovery-phrase-tool.html
//https://iancoleman.io/bip39/