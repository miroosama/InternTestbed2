const bip39 = require("bip39");
const bip32 = require("bip32");
const { pubKeyToAddress } = require('@cobo/crypto-address')
const hdkey = require('hdkey')
const wif = require('wif')
const fs = require('fs')
const ecc = require('eosjs-ecc');
const { USBAdapter } = require('../adapters/USBAdapter')


class EOSWallet {
    constructor(name, input=''){
        /** this if else region below can be used as an extensible bip32
         *  parent object for every Wallet type. 
         */
    
        this.name = name;
        this.accounts = [];
        this.coinType = 43;
        console.log(pubKeyToAddress)
        if (input==''){
            this.mnemonic = bip39.generateMnemonic(256);
            this.seed = bip39.mnemonicToSeed(this.mnemonic);
            this.rootNode = bip32.fromSeed(this.seed);
            this.node = hdkey.fromMasterSeed(Buffer.from(this.seed, 'hex'))
            this.rootKey = this.rootNode.toBase58();
        } else if (input.split(' ').length == 24) {
            this.mnemonic = input;
            this.seed = bip39.mnemonicToSeed(this.mnemonic);
            this.rootNode = bip32.fromSeed(this.seed);
            this.rootKey = this.rootNode.toBase58();
            this.node = hdkey.fromMasterSeed(Buffer.from(this.seed, 'hex'))
        }
        
        /** The following for loop region can be nested further
         *  in a foreach loop which iterates over an array where each
         *  index is populated by a coin value ie [0,44,144] where 
         *  the derivation path forks. account and address mgmt are
         *  the features that distinguish each coin and are thereby
         *  where we would seek to extend the parent HDWallet class.
         */
        for (let i = 0; i<3; i++){
            this.accounts.push(
            {
                aXPrv: this.rootNode.derivePath(`m/44'/${this.coinType}'/${i}'`).toBase58(),
                aXPub: this.rootNode.derivePath(`m/44'/${this.coinType}'/${i}'`).neutered().toBase58(),
                priv: wif.encode(128, this.node._privateKey, false),
                pub: ecc.PublicKey(this.node._publicKey).toString()
            }
        )}
        // this.writeOut();
        console.log(this.getColdAccount())
    }
    getColdAccount(){
        return({
            name: this.name,
            mnemonic: this.mnemonic,
            seed: this.seed,
            rootKey: this.rootKey,
            accounts: this.accounts
        })
    }
}
new EOSWallet('dingo','eight person fade off border garden ugly borrow rhythm bronze gadget combine tower list bus raven flock ethics adult task galaxy detect tilt envelope');