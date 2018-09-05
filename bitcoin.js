var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');

var network = bitcoin.networks.testnet; // bitcoin.networks.bitcoin for mainnet
var mnemonic = "fun swamp jump history obvious scare struggle deputy cannon village buzz state power play expose moral million lift gravity size chalk grocery scout toss";
var seed = bip39.mnemonicToSeed(mnemonic);
var root = bitcoin.bip32.fromSeed(seed);
// HDNode was deprecated: https://github.com/bitcoinjs/bitcoinjs-lib/issues/1206
// and https://github.com/bitcoinjs/bitcoinjs-lib/issues/1047

const node = root.deriveHardened(44).deriveHardened(1).deriveHardened(0).derive(0).derive(0)

console.log(getAddress(node, network));

function getAddress (node, network) {

    return bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address
}

// Compare with:
//https://coinomi.com/recovery-phrase-tool.html
//https://iancoleman.io/bip39/

//Next get the private key

