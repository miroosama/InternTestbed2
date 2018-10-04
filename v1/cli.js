#!/usr/bin/env node

const fs = require('fs');
const program = require('commander');
const args = require('minimist')(process.argv.slice(2))._;
const EtherWallet = require('../classes/myEther')
const BitcoinWallet = require('../classes/BTCWallet')
const BTCTx = require('../classes/BTCTx')
const EtherTx = require('../classes/myEtherTx')
const BTCSign = require('../classes/BTCSignTx')
const ETHSign = require('../myEtherSign.js')


let create = {
  btc: BitcoinWallet,
  eth: EtherWallet
}

let coinManager = {
btc: BTCTx,
eth: EtherTx
}

let signatures = {
  btc: BTCSign,
  eth: ETHSign
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

    signTx(){
      let transaction = fs.readFileSync('./classes/accounts/unsignedTx.json', 'utf8')
      for(var coin in signatures){
        if(coin == this.args[1]){
          new signatures[coin](transaction).sign()
        }
      }
    }

    broadcastTx(){
      let txhex = fs.readFileSync('./classes/accounts/signedTx.json', 'utf8')
      for(var coin in coinManager){
        if(coin == this.args[1]){
          new coinManager[coin]().broadcastTx(txhex)
        }
      }
    }

    
  }

  let user = new User(args);
  user.path();

