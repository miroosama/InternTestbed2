var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');


var netwrk = bitcoin.networks.testnet;

var mnemonic = "fun swamp jump history obvious scare struggle deputy cannon village buzz state power play expose moral million lift gravity size chalk grocery scout toss";
var seed = bip39.mnemonicToSeed(mnemonic);
var root = bitcoin.bip32.fromSeed(seed, network);
// HDNode was deprecated: https://github.com/bitcoinjs/bitcoinjs-lib/issues/1206
// and https://github.com/bitcoinjs/bitcoinjs-lib/issues/1047

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

console.log(getAddress(node, network));

function getAddress (node, network) {

    return bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address
}

// Compare with:
//https://coinomi.com/recovery-phrase-tool.html
//https://iancoleman.io/bip39/

//Next get the private key

