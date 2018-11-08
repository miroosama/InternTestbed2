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

