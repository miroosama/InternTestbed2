var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');
const Store = require('data-store');
const store = new Store({
  path: './../config.json'
})
store.set('addressCounter', 0)
var network = bitcoin.networks.testnet;


exports.Wallet = (() => {
  return class {
    constructor() {
      this.address = "",
<<<<<<< HEAD
      this.privateKey = "",
      this.extendedPrivateKey = "",
      this.changeAddr = "",
      this.changePrivateKey = "",
      this.addresses = [],
      this.scripthash = ""
=======
        this.privateKey = "",
        this.changeAddr = "",
        this.changePrivateKey = "",
        this.addresses = [],
        this.scripthash = ""
>>>>>>> 8ee04cad239e0158f92470fbf94658627c796717
    }

    createOrUpdateAccount(str, val) {
      if (val == "false") {
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
      var root = bitcoin.bip32.fromSeed(seed, network);
      console.log(root)
      return bitcoin.bip32.fromSeed(seed, network);
    }

    getNode(root) {
      let address = parseInt(store.data.addressCounter)
      var node = root.deriveHardened(44).deriveHardened(1).deriveHardened(0).derive(0).derive(address)
      var extNode = root.deriveHardened(44).deriveHardened(1).deriveHardened(0).derive(0)
      let extPrv = extNode.toBase58()
      this.extendedPrivateKey = extPrv
      console.log("Extended Private Key", this.extendedPrivateKey)
      // let extPub = node.neutered().toBase58()
      // console.log(extPub)
      let prk = node.toWIF()
      this.getAddress(node, network, prk)
      return this.extendedPrivateKey
    }

    getNewNode(root) {
      let updateAddress = store.data.addressCounter += 1
      store.set('addressCounter', updateAddress)
      let newAddress = parseInt(store.data.addressCounter)
      var node = root.deriveHardened(44).deriveHardened(1).deriveHardened(0).derive(0).derive(newAddress)
      let prk = node.toWIF()
      return this.getChangeAddress(node, network, prk)
    }

<<<<<<< HEAD
    getAddress (node, network, prk) {
      console.log("PrivateKey1",prk)
      console.log("address", bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address)
      this.address = bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address
=======
    getAddress(node, network, prk) {
      console.log("PrivateKey1", prk)
      console.log(bitcoin.payments.p2pkh({
        pubkey: node.publicKey,
        network
      }).address)
      this.address = bitcoin.payments.p2pkh({
        pubkey: node.publicKey,
        network
      }).address
>>>>>>> 8ee04cad239e0158f92470fbf94658627c796717
      this.privateKey = prk
      let script = bitcoin.address.toOutputScript(this.address, network)
      let hash = bitcoin.crypto.sha256(Buffer.from(script))
      let reversedHash = hash.reverse()
      this.scripthash = reversedHash.toString('hex')
      return this.address
    }

<<<<<<< HEAD
    getChangeAddress (node, network, prk) {
      console.log("PrivateKey2",prk)
      console.log("change address", bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address)
      this.changeAddr = bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address
=======
    getChangeAddress(node, network, prk) {
      console.log("PrivateKey2", prk)
      console.log(bitcoin.payments.p2pkh({
        pubkey: node.publicKey,
        network
      }).address)
      this.changeAddr = bitcoin.payments.p2pkh({
        pubkey: node.publicKey,
        network
      }).address
>>>>>>> 8ee04cad239e0158f92470fbf94658627c796717
      this.changePrivateKey = prk
      return this.address
    }
  }
})()

console.log(bitcoin.bip32.fromSeed(bip39.mnemonicToSeed("fun swamp jump history obvious scare struggle deputy cannon village buzz state power play expose moral million lift gravity size chalk grocery scout toss"), network))