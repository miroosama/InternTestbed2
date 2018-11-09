// const electron = window.require('electron');
// const remote = electron.remote;
const bitcoin = require('bitcoinjs-lib');
const eosUtil = require('eosjs-ecc');
var bip39 = require('bip39');
var os = require("os");
const fs = require('fs')

let eos = require('@cobo/eos')

let id = 0

function generateAccounts(){
    for(let i = 0; i < 1600; i++){
    let mnemonic = bip39.generateMnemonic(256)
    const wallet = eos.fromMasterSeed(mnemonic)
    const pubkey = wallet.getPublicKey()
    console.log(pubkey)
    fs.open('./pubkeys.txt', 'a', 666, function( e, id ) {
        fs.write( id, pubkey + os.EOL, null, 'utf8', function(){
         fs.close(id, function(){
          console.log('file is updated');
         });
        });
       });
       id += 1
    }

}

generateAccounts()