// const Web3 = require('web3')
// const fs = require('fs')
// const bip39 = require("bip39");
// const bip32 = require("ripple-bip32");

// web3 = new Web3(new Web3.providers.HttpProvider(" https://testnet-rpc.thundercore.com:8544"))
// const Tx = require('ethereumjs-tx')

//     class ThunderWallet extends Web3 {
//         constructor(){
//             super();
//             this.acc = ""
//         }
        // buildingTx(send, rec, amount) {
        //     web3.eth.getTransactionCount(send, (err, txCount) => { 
        //         const txObject = {
        //             nonce: web3.utils.toHex(txCount),
        //             to: rec,
        //             value: web3.utils.toHex(web3.utils.toWei(amount, 'ether')),
        //             gasLimit: web3.utils.toHex(21000),
        //             gasPrice: web3.utils.toHex(web3.utils.toWei('41', 'gwei'))
        //         }
        //         const tx = new Tx(txObject) 
        //         let txSigned = this.signTx(tx)
    
        //         web3.eth.sendSignedTransaction(txSigned, (err, txHash) => {
        //             console.log('txhash:', txHash)
        //         })
        //     })
        // }
    
    
        // signTx(tx){
        //     // let prk = this.account.privateKey.slice(2)
        //     const privateK = Buffer.from('e3f2cf6c630fe31f6e8d2b288cfee9a83c7c7ff845d743035e247f3a6cdb823a', 'hex')
        //     tx.sign(privateK)
        //     const serializedTransaction = tx.serialize() 
        //     const raw = '0x' + serializedTransaction.toString('hex')
        //     return raw
        // }

    // }


// let h = new ThunderWallet().createAccount('0x562502D8cAC9340358a39343bB589a30cC93Fc75', '0xAA98F82AB403663748E10B6f7256E3C29CDD0051', '0.1')

// Wallet {
//     _accounts: [Circular],
//     length: 0,
//     defaultKeyName: 'web3js_wallet' } }
// { address: '0x562502D8cAC9340358a39343bB589a30cC93Fc75',
//  privateKey:
//   '0xe3f2cf6c630fe31f6e8d2b288cfee9a83c7c7ff845d743035e247f3a6cdb823a',
//  signTransaction: [Function: signTransaction],
//  sign: [Function: sign],
//  encrypt: [Function: encrypt] }

// 0xAA98F82AB403663748E10B6f7256E3C29CDD0051

// Transaction hash: 0xe7a38fbe787f7b79fb500dabea9739c45b95d256a24991335b0d6f0f50c8f92d

// txhash: 0x205d3593f1f5009c4664ee3f6862874f7c2caf112199836a68eaa711c4eb8e5c


// let mnemonic = bip39.generateMnemonic(256);
// let seed = bip39.mnemonicToSeed(mnemonic);
// let rootNode = bip32.fromSeedBuffer(seed);
// let rootKey = rootNode.toBase58();
// let account = {
//     aXPrv: rootNode.derivePath(`m/44'/1001'/0'`).toBase58(),
//     aXPub: rootNode.derivePath(`m/44'/1001'/0'`).neutered().toBase58(),
//     address: rootNode.derivePath(`m/44'/1001'/0'/0/0`).getAddress(),
//     keyPair: rootNode.derivePath(`m/44'/1001'/0'/0/0`).keyPair.getKeyPairs()
// }
// console.log(account)



const bitcoin = require('bitcoinjs-lib');
var ethUtil = require('ethereumjs-util');
var bip39 = require('bip39');

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