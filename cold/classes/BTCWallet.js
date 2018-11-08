var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');
var {
  USBAdapter
} = require('../../adapters/USBAdapter')
var network = bitcoin.networks.testnet;
var fs = require('fs')

exports.BTCWallet = (() => {
  return class {
    constructor(mnemonic = "") {
      this.mnemonic = mnemonic
    }

    async createAccount() {
      let seed = bip39.mnemonicToSeed(this.mnemonic);
      let root = bitcoin.bip32.fromSeed(seed, network)
      let node = root.deriveHardened(44).deriveHardened(1).deriveHardened(0)
      let nodeSend = node.neutered().toBase58()
      let intNode = node.derive(1)
      let extNode = node.derive(0)
      let extendedPubExt = extNode.neutered().toBase58()
      let extendedPubInt = intNode.neutered().toBase58()
      let extPrv = extNode.toBase58()
      fs.writeFileSync(`../InternTestbed2/cold/accounts/${extendedPubExt}`, JSON.stringify(extPrv))
      let path = await USBAdapter.getPath().catch(err => {
        console.log(err)
      })
      fs.writeFileSync(`${path}/${extendedPubExt}.json`, JSON.stringify(nodeSend))
      // console.log(node) 
    }
  }
})();