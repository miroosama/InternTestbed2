var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');
const request = require('request')
const axios = require('axios')

var network = bitcoin.networks.testnet;

function getMnemonic(str){
    return getSeed(str)
}

function getSeed(str){
    let seed = bip39.mnemonicToSeed(str);
   let root = getRoot(seed)
   return getNode(root, "false")
}

function getRoot(str){
    return root = bitcoin.bip32.fromSeed(str, network);
}

function getNode(root, str){
    let counter = 0
    if(str == "true"){
        counter++
    var node = root.deriveHardened(44).deriveHardened(1).deriveHardened(0).derive(0).derive(counter)
    } else {
        var node = root.deriveHardened(44).deriveHardened(1).deriveHardened(0).derive(0).derive(counter)
    }
    let prk = node.toWIF()
    return getAddress(node, network, prk)
}

function getAddress (node, network, prk) {
    console.log("HII",prk)
    return bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address
}

// var root = bitcoin.bip32.fromSeed(seed, network);


