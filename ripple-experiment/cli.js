#!/usr/bin/env node

const args = require('minimist')(process.argv.slice(2))._;
const RippleAPI = require('ripple-lib').RippleAPI;
const fs = require('fs');

const {
  RippleWallet
} = require('./RippleWallet');

const {
  RippleTx
} = require('./RippleTx');

const {
  RippleSignTx
} = require('./RippleSignTx');

const {
  Payment
} = require('./RipplePayment');

const api = new RippleAPI({
  // server: 'wss://s1.ripple.com' // Public rippled server
  server: 'wss://s.altnet.rippletest.net:51233' // This is the Ripple testnet server 
});

class User {
  constructor(args) {
    this.args = args;
  }

  async path() {
    switch (this.args[0]) {
      case 'create-account':
        const rippleWallet = new RippleWallet(this.args[1]);
        rippleWallet.createAccount();
        break;
      case 'build-transaction':
        const rippleTx = new RippleTx(this.args[1], this.args[2], this.args[3], this.args[4]);
        // rippleTx.buildTx();
        fs.writeFileSync(`./unsignedTx.json`, JSON.stringify(await rippleTx.run()))
        break;
      case 'sign-transaction':
        let utx = JSON.parse(fs.readFileSync('./unsignedTx.json', 'utf8'))
        console.log(utx)
        const rippleSignTx = new RippleSignTx(utx);
        // // console.log(this.args)
        rippleSignTx.signTx()
        break;
      case 'account-info':
        this.getAccountInfo(this.args[1]);
        break;
      case 'get-balance':
        this.getBalance(this.args[1]);
        break;
      case 'make-payment':
        const payment = new Payment(this.args[1], this.args[2], this.args[3], this.args[4])
        payment.run();
        break;
      default:
        console.log('Please enter a valid command')
    }
  }

  getAccountInfo(address) {
    api.connect().then(() => {
      /* begin custom code ------------------------------------ */
      const myAddress = address;

      console.log('getting account info for', myAddress);
      return api.getAccountInfo(myAddress);

    }).then(info => {
      console.log(info);
      console.log('getAccountInfo done');

      /* end custom code -------------------------------------- */
    }).then(() => {
      return api.disconnect();
    }).then(() => {
      console.log('done and disconnected.');
    }).catch(console.error);
  }

  getBalance(address) {
    api.connect().then(() => {
      return api.getAccountInfo(address);
    }).then((info) => {
      console.log("Your balance: ", info.xrpBalance)
    }).then(() => {
      return api.disconnect();
    }).catch(console.error);
  }
}

let user = new User(args);
user.path()


'rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn'

// novel matter final only nice cheese address cradle civil crash great flame struggle consider crowd surface purpose saddle mango endless mixed trial tape wrap

// Account from the above mnemonic: rHygPg8NvpAgppUBTvHYF4q34oXtb5Uk4f