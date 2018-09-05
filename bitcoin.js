var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');

var netwrk = bitcoin.networks.testnet;

var mnemonic = "fun swamp jump history obvious scare struggle deputy cannon village buzz state power play expose moral million lift gravity size chalk grocery scout toss";
var seed = bip39.mnemonicToSeed(mnemonic);
var root = bitcoin.bip32.fromSeed(seed)
var path = "m/44'/1'/0'/0/0"
var child = root.derivePath(path)


var Tree = bitcoin.bip32.fromSeed(seed, netwrk);
var Leaf = Tree.deriveHardened(44).deriveHardened(1).deriveHardened(0).derive(0).derive(0);
var Leaf2 = Tree.deriveHardened(44).deriveHardened(1).deriveHardened(0);

console.log(getPublicKey(Leaf))
console.log(getPrivateKey(Leaf))
console.log(getAddress(Leaf))

function getAddress(node){
    var publicKeyHash = bitcoin.crypto.hash160(node.publicKey);
    return bitcoin.address.toBase58Check(publicKeyHash, netwrk.pubKeyHash);
}

function getPublicKey(node){
    return node.publicKey.hexSlice()
}

function getPrivateKey(node){
    return node.toWIF()
}




// https://coinomi.com/recovery-phrase-tool.html
// https://iancoleman.io/bip39/