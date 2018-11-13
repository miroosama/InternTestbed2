// const electron = window.require('electron');
// const remote = electron.remote;
const bitcoin = require('bitcoinjs-lib');
const eosUtil = require('eosjs-ecc');
var bip39 = require('bip39');
var os = require("os");
const fs = require('fs')
const hdkey = require('hdkey')
const wif = require('wif')

let eos = require('@cobo/eos')

let id = 0

// function generateAccounts(){
//     for(let i = 0; i < 1; i++){
//     let mnemonic = bip39.generateMnemonic(256)
//     console.log(mnemonic)
//     const wallet = eos.fromMnemonic(mnemonic)
//     const pubkey = wallet.getPublicKey()

//     console.log(pubkey)
//     fs.open('./pubkeys.txt', 'a', 666, function( e, id ) {
//         fs.write( id, pubkey + os.EOL, null, 'utf8', function(){
//          fs.close(id, function(){
//           console.log('file is updated');
//          });
//         });
//        });
//        id += 1
//     }
// }

// function generateAccounts(){
//     for(let i = 0; i < 1; i++){
//     let mnemonic = bip39.generateMnemonic(256)
//     let seed = bip39.mnemonicToSeed(mnemonic);
    // let node = hdkey.fromMasterSeed(Buffer.from(seed, 'hex'))
    // let prk = wif.encode(128, node._privateKey, false)
//     console.log(prk)
//     }
// }


// generateAccounts()

// var request = require("request");
// let params = JSON.stringify({account_name:"gqztenjzgege")
// var options = { method: 'POST', body: [`${params}`],
//   url: 'https://api.eosnewyork.io/v1/chain/get_account'};

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);

//   console.log(body);
// });

var request = require("request");
// let params = JSON.stringify({account_name:"gqztenjzgege")
var options = { method: 'POST',
  url: 'https://api.eosnewyork.io/v1/chain/get_info'};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});



// function GetAccount(network, seed, index, coinType) {
//     let networkUsed = bitcoin.networks.bitcoin;
//     console.log("Network Used: ", networkUsed);
//     console.log("EOS wallet helper get account. seed: %s index %s coinType %s" , seed, index, coinType);
//     var node = bitcoin.HDNode.fromSeedBuffer(seed, networkUsed);
//     var EOSNode = node.deriveHardened(44).deriveHardened(coinType).deriveHardened(index).derive(0).derive(0);
//     var privKeyBuffer = EOSNode.keyPair.d;
//     var privKey = eosUtil.PrivateKey(privKeyBuffer);
//     var privKeyWIF = privKey.toWif();
//     var address = privKey.toPublic().toString();
//     return new Account(address, privKeyWIF);
// }