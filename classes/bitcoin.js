var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');


var network = bitcoin.networks.testnet;


class Wallet {

constructor(){
  this.counter = 0,
  this.address = "",
  this.privateKey = "",
  this.changeAddr = "",
  this.changePrivateKey = "",
  this.addresses = [],
  this.scripthash = ""
}
    createOrUpdateAccount(str, val){
      if(val == "false"){
      let seed = bip39.mnemonicToSeed(str);
      let root = this.getRoot(seed)
      return this.getNode(root)
    } else {
      let seed = bip39.mnemonicToSeed(str);
      let root = this.getRoot(seed)
      return this.getNewNode(root)
    }
  }


  getRoot(seed) {
    // var root = bitcoin.bip32.fromSeed(seed, network);
    return bitcoin.bip32.fromSeed(seed, network);
  }

  getNode(root) {
    var node = root.deriveHardened(44).deriveHardened(1).deriveHardened(0).derive(0).derive(0)
    let prk = node.toWIF()
    return this.getAddress(node, network, prk)
  }

    getNewNode(root){
       this.counter += 1
      // store.set('addressCounter', `${this.counter}`)
      // let newAddress = store.data.addressCounter
      var node = root.deriveHardened(44).deriveHardened(1).deriveHardened(0).derive(0).derive(this.counter)
      let prk = node.toWIF()
      return this.getChangeAddress(node, network, prk)

  }

  getAddress (node, network, prk) {
    console.log("PrivateKey1",prk)
    console.log(bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address)
    this.address = bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address
    this.privateKey = prk
    this.scripthash = node.publicKey
  }

  getChangeAddress (node, network, prk) {
    console.log("PrivateKey2",prk)
    console.log(bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address)
    this.changeAddr = bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address
    this.changePrivateKey = prk
  }



}


module.exports = Wallet;