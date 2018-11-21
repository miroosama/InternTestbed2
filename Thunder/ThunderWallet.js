const bitcoin = require('bitcoinjs-lib');
var ethUtil = require('ethereumjs-util');
var bip39 = require('bip39');



class ThunderWallet {


    createAccount(){
    var mnemonic = bip39.generateMnemonic(256); //create new
    var seed = bip39.mnemonicToSeed(mnemonic); 
    
    var coinType = 1001;
    var index = 0;

    let networkUsed = bitcoin.networks.bitcoin;
    var node = bitcoin.bip32.fromSeed(seed, networkUsed)
    var ETHNode = node.deriveHardened(44).deriveHardened(parseInt(coinType)).deriveHardened(index).derive(0).derive(0); 

    var pubkey = ETHNode.neutered().publicKey.toString('hex');
    var privKeyBuffer = ETHNode.privateKey.toString('hex')
    var privkey = privKeyBuffer.toString('hex');
    var addressBuffer = ethUtil.privateToAddress(ETHNode.privateKey);
    var hexAddress = addressBuffer.toString('hex');
    var checksumAddress = ethUtil.toChecksumAddress(hexAddress);
    var address = ethUtil.addHexPrefix(checksumAddress)
    var pubkey = ethUtil.addHexPrefix(pubkey);
    
    console.log("Address:" + address)
    console.log('Private Key:' + privkey);
    console.log("Public Key:"+ pubkey);  
    }

}

module.exports = { ThunderWallet }