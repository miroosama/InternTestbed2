const bip39 = require("bip39");
const bip32 = require("ripple-bip32");
const fs = require('fs')
const { USBAdapter } = require('../adapters/USBAdapter')


class XRPWallet {
    constructor(name, input=''){
        /** this if else region below can be used as an extensible bip32
         *  parent object for every Wallet type. 
         */
    
        this.name = name;
        this.accounts = [];
        if (input==''){
            this.mnemonic = bip39.generateMnemonic(256);
            this.seed = bip39.mnemonicToSeed(this.mnemonic);
            this.rootNode = bip32.fromSeedBuffer(this.seed);
            this.rootKey = this.rootNode.toBase58();
        } else if (input.split(' ').length == 24) {
            this.mnemonic = input;
            this.seed = bip39.mnemonicToSeed(this.mnemonic);
            this.rootNode = bip32.fromSeedBuffer(this.seed);
            this.rootKey = this.rootNode.toBase58();
        } else if (input.slice(0,4) == 'xprv') {
            this.mnemonic = null;
            this.rootKey = input;
            this.rootNode = bip32.fromBase58(this.rootKey);
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
                aXPrv: this.rootNode.derivePath(`m/44'/144'/${i}'`).toBase58(),
                aXPub: this.rootNode.derivePath(`m/44'/144'/${i}'`).neutered().toBase58(),
                address: this.rootNode.derivePath(`m/44'/144'/${i}'/0/0`).getAddress(),
                keyPair: this.rootNode.derivePath(`m/44'/144'/${i}'/0/0`).keyPair.getKeyPairs()
            }
        )}
        this.writeOut();
        // console.log(this.getColdAccount())
    }
    async writeOut(){
        let path = await USBAdapter.getPath().catch(err => {console.log(err)});
        if (path) {
            console.log(`${path}/accounts/${this.name}.json`)
            fs.writeFileSync(`ripple-experiment/coldAccounts/${this.name}.json`, JSON.stringify(this.getColdAccount()));
            fs.writeFileSync(`${path}/accounts/${this.name}.json`, JSON.stringify(this.export()));
            this.accounts.map(account=>{
                fs.writeFileSync(`ripple-experiment/keyDump/${account.keyPair.publicKey}`, JSON.stringify(account.keyPair.privateKey));
            })
        } else {
            console.log('please insert USB')
        }
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
    export(){
        return ({
            name: this.name,
            accounts: this.accounts.map(account=>{
                return {
                    address: account.address,
                    pubKey: account.keyPair.publicKey
                }
            })
        })
    }
}
module.exports = XRPWallet;