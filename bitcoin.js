var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');

<<<<<<< HEAD

var netwrk = bitcoin.networks.testnet;

=======
var network = bitcoin.networks.testnet; // bitcoin.networks.bitcoin for mainnet
>>>>>>> d43d36a69dd498d67934fcff7d992fc7fb87a49f
var mnemonic = "fun swamp jump history obvious scare struggle deputy cannon village buzz state power play expose moral million lift gravity size chalk grocery scout toss";
var seed = bip39.mnemonicToSeed(mnemonic);
<<<<<<< HEAD
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
=======
var root = bitcoin.bip32.fromSeed(seed, network);
// HDNode was deprecated: https://github.com/bitcoinjs/bitcoinjs-lib/issues/1206
// and https://github.com/bitcoinjs/bitcoinjs-lib/issues/1047

<<<<<<< HEAD
var Tree = bitcoin.bip32.fromSeed(seed, netwrk);
var Leaf = Tree.deriveHardened(44).deriveHardened(1).deriveHardened(0).derive(0).derive(0);
// console.log(Leaf.getAddress());
console.log(Leaf.toWIF())
// console.log(bitcoin.bip32.fromBase58)

// const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'
// const seed = bip39.mnemonicToSeed(mnemonic)
const root = bitcoin.bip32.fromSeed(seed)

var p = Leaf.deriveHardened(0)

const path = "m/44'/1'/0'/0/0"
const child = root.derivePath(path)


// const { address } = bitcoin.payments.p2sh({
//     redeem: bitcoin.payments.p2wpkh({ pubkey: child.publicKey, network: bitcoin.networks.testnet }),
//     network: bitcoin.networks.testnet
//   })

  

  // function getAddress (node, network) {
  //   return bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address
  // }

  // let ad = bitcoin.payments.p2pkh({ pubkey: Leaf.publicKey, netwrk }).address
  
  // let add = assert.strictEqual(getAddress(root.derivePath("m/44'/1'/0'/0/0")), '1wd1BwtJvh9rDzkRSZtRHTgB4tENCczMH')

var publicKeyHash = bitcoin.crypto.hash160(child.publicKey);
var address1 = bitcoin.address.toBase58Check(publicKeyHash, netwrk.pubKeyHash);
=======
const node = root.deriveHardened(44).deriveHardened(1).deriveHardened(0).derive(0).derive(0)
>>>>>>> d43d36a69dd498d67934fcff7d992fc7fb87a49f

console.log(getAddress(node, network));

function getAddress (node, network) {

    return bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address
}

// Compare with:
//https://coinomi.com/recovery-phrase-tool.html
//https://iancoleman.io/bip39/

//Next get the private key

>>>>>>> dc5eef43f1a37a73759c1d3b66fe3e66bbfee5ec
