var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');
var network = bitcoin.networks.testnet;
var fs = require('fs')

class Wallet {
    constructor(mnemonic = "") {
      this.mnemonic = mnemonic
    }

    createAccount() {
        let seed = bip39.mnemonicToSeed(this.mnemonic);
        let root = bitcoin.bip32.fromSeed(seed, network)
        let node = root.deriveHardened(44).deriveHardened(1).deriveHardened(0)
        let nodeSend = node.neutered().toBase58()
        let intNode = node.derive(1)
        let extNode = node.derive(0)
        let extendedPubExt = extNode.neutered().toBase58()
        let extendedPubInt = intNode.neutered().toBase58()
        let extPrv = extNode.toBase58()
        // let account = fs.writeFileSync(`../${extendedPubExt}.json`, JSON.stringify([extPrv, extendedPubInt]))
        let account = fs.writeFileSync(`../classes/accounts/${extendedPubExt}.json`, JSON.stringify(nodeSend)) 
        // console.log(node) 
      } 
  }

  module.exports = Wallet;

// console.log(bitcoin.bip32.fromSeed(bip39.mnemonicToSeed("fun swamp jump history obvious scare struggle deputy cannon village buzz state power play expose moral million lift gravity size chalk grocery scout toss"), network))

let wallet = new Wallet("human sun wall return tragic bless detail foot rescue gown deer clerk body certain casual")
wallet.createAccount()

// human sun wall return tragic bless detail foot rescue gown deer clerk body certain casual
// law used index main pony kitchen finish hospital laugh diary obtain jewel usage decade peanut