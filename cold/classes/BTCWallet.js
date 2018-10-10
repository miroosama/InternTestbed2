var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');
var {
  USBAdapter
} = require('../../adapters/USBAdapter')
var network = bitcoin.networks.testnet;
var fs = require('fs')

<<<<<<< HEAD
exports.BTCWallet = (()=>{
  /** This class must be refactored to contain the getBalance and getInfo methods
   *  Must also be refactoed to allow a user to create multiple accounts. In BTC
   *  the derivation path is described thusly: 44'/0'/Account'/Change/Address.
   *  Accounts are hardened derivations of the coin, built off of a seed value.
   *  this means our UTXO indexer must be aware of every account. A wallet
   *  therefore must hold state describing its accounts (right?)
   */
=======
exports.BTCWallet = (() => {
>>>>>>> 3a9a1814f75fd5c93752b371701327ad1963a17d
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