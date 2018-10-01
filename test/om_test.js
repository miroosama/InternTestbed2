const assert = require('chai').assert;
const { Wallet } = require("../classes/BTCWallet")
var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');
const network = bitcoin.networks.testnet;
let seed = bip39.mnemonicToSeed("blah blah blah blah blah blah")

let wallet = new Wallet()
let root = wallet.getRoot(seed, network)
let node = root.deriveHardened(44).deriveHardened(1).deriveHardened(0).derive(0).derive(0)

describe("wallet.getRoot", function(){
    it('getRoot should return a wif', function(){
        let ret = wallet.getRoot(seed, network)
        assert.equal(ret.network.wif, '239' )
    })
})

describe("wallet.getNode", function(){
    it('getNode should return an extended private key', function(){
        let ret = wallet.getNode(root)
        assert.equal(ret.slice(0, 4), "tprv" )
    })
})

describe("wallet.getAddress", function(){
    it('getAddress should return a valid address length', function(){
        let ret = wallet.getAddress(node, network, "")
        assert.lengthOf(ret, "34" )
    })
})
