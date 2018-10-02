var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');
var network = bitcoin.networks.testnet;
var fs = require('fs')

class Wallet {
    constructor(mnemonic = "") {
      this.mnemonic = mnemonic
    }

    createOrUpdateAccount() {
        let seed = bip39.mnemonicToSeed(this.mnemonic);
        let root = bitcoin.bip32.fromSeed(seed, network)
        let extNode = root.deriveHardened(44).deriveHardened(1).deriveHardened(0).derive(0)
        let extPub = extNode.neutered().toBase58()
        let extPrv = extNode.toBase58()
        let account = fs.writeFileSync(`../${extPub}.json`, JSON.stringify([extPrv, extPub]))
        let account = fs.writeFileSync(`../${extPub}.json`, JSON.stringify([extPub]))
      } 
  }

// console.log(bitcoin.bip32.fromSeed(bip39.mnemonicToSeed("fun swamp jump history obvious scare struggle deputy cannon village buzz state power play expose moral million lift gravity size chalk grocery scout toss"), network))

let wallet = new Wallet("law used index main pony kitchen finish hospital laugh diary obtain jewel usage decade peanut")
wallet.createOrUpdateAccount()