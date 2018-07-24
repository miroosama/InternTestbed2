var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');

var netwrk = bitcoin.networks.testnet;

var mnemonic = "fun swamp jump history obvious scare struggle deputy cannon village buzz state power play expose moral million lift gravity size chalk grocery scout toss";
var seed = bip39.mnemonicToSeed(mnemonic);

var Tree = bitcoin.HDNode.fromSeedBuffer(seed, netwrk);
var Leaf = Tree.deriveHardened(44).deriveHardened(1).deriveHardened(0).derive(0).derive(0);
console.log(Leaf.getAddress());

//Next get the private key
//var Leaf2 = node.deriveHardened(44).deriveHardened(1).deriveHardened(0);

//https://coinomi.com/recovery-phrase-tool.html
//https://iancoleman.io/bip39/