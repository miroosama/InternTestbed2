#!/usr/bin/env node

const fs = require('fs');
const args = require('minimist')(process.argv.slice(2))._;
const {ETHSignTx} = require("../cold/classes/ETHSignTx")
const {BTCSignTx} = require("../cold/classes/BTCSignTx")
const {BTCWallet} = require("../cold/classes/BTCWallet")
const {ETHWallet} = require("../cold/classes/ETHWallet")
const {BTCTx} = require("../hot/classes/BTCTx")
const {ETHTx} = require("../hot/classes/ETHTx")
const USBAdapter = require('../adapters/USBAdapter.js')

let create = {
  btc: BTCWallet,
  eth: ETHWallet
}

let coinManager = {
  btc: BTCTx,
  eth: ETHTx
}

let signatures = {
  btc: BTCSignTx,
  eth: ETHSignTx
}


class User {
    constructor(args) {
      this.args = args;
    }

    path() {
      /** Right now this switch lacks a getBalance() function,
       *  which should be remedied in this weekend's refactor. 
       *  at first this is a simple fix that just involves invoking the 
       *  getBalance() function of the TX classes.
       *  This refactor should also involve moving the getBalance()
       *  functions out of the TX class and into the wallets, as TXs
       *  belong to wallets and are discrete instances. While they 
       *  may not have explicitly ORM managing their relations,
       *  this model relies on a flyweight pattern wallet with 
       *  attributes passed by reference. For this reason wallets must 
       *  live in both hot and cold storage, as they represent a single
       *  source of truth by which transactions, signing are formed.
       */
      switch (this.args[0]) {
        case 'create':
        for(var coin in create){
          new create[coin](this.args[1]).createAccount()
        }
          break;
        case 'import':
        this.importFile();
        break;
        case 'sign':
        this.signTx();
        break;
        case 'broadcast':
        this.broadcastTx();
        break;
        default:
          console.log('please enter a command');
      }
    }

    importFile() {
      /** This method needs to be refactored. Currently it builds a transaction out of a hardcoded 'account' file,
       *  which we decided to implement by naming a file the pubKey and housing a pubkey inside of it. 
       *  instead an account should export a file with a name indicating the client, and a JSON obj of 
       *  all of the critical tpubs in it. The files where the key naming convention are critical are the unsigned TXs
       *  and the the private keys on the server side. for this particular method though, it should actually import
       *  account files from the flash drive in cold storage and move them over to a hot 'accounts' folder.
       *  this way, when we use the CLI to build a transaction, we specify a client and the coin they want to egress
       *  their assets from, as well as an amount and a fee, in an additional build transaction method. This method
       *  will then scan the local drive for a folder with that specific client file, and pull out the key/value 
       *  for that specific coin: 'pubKey.' So this method must be split in twain, by taking the file reading method
       *  and adding some logic that will read out and delete any account JSON files from the flash drive that are 
       *  not stored locally, and keeping this logic discrete from the TXBuild() neccesary to make dynamic transactions
       */
      let account = fs.readFileSync('./classes/accounts/tpubDFe6R4ftoEmXJyTBufCo5gzZR41Xkuhegyqt2XQuc5WiZ27yJtq4V3T2nJr2yVNbU3jJmpYCiSiwH7k4QJkqNKqrA1crMQksucUcKQjTDF6.json', 'utf8')
      for(var coin in coinManager){
        if(coin == this.args[1]){
          let transaction = new coinManager[coin](account)
            if(this.args[2] == 'check'){
              transaction.getBalance()
            } else {
              console.log("here")
              transaction.buildingTx(this.args[3], this.args[4])
            }
        }
      }
    }

    async signTx(){
      let path = await USBAdapter.getPath().catch(err => {console.log(err)})
      let transaction = fs.readFileSync(`${path}/unsignedTx.json`, 'utf8')
      for(var coin in signatures){
        if(coin == this.args[1]){
          new signatures[coin](transaction).sign()
        }
      }
    }

   async broadcastTx(){
      let path = await USBAdapter.getPath().catch(err => {console.log(err)})
      let txhex = fs.readFileSync(`${path}/txhex.json`, 'utf8')
      for(var coin in coinManager){
        if(coin == this.args[1]){
          new coinManager[coin]().broadcastTx(txhex)
        }
      }
    }

    
  }

  let user = new User(args);
  user.path();

