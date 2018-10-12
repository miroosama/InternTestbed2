#!/usr/bin/env node

const args = require('minimist')(process.argv.slice(2))._;
const RippleAPI = require('ripple-lib').RippleAPI;
const fs = require('fs');

const {
  RippleWallet
} = require('./XRPWallet');

const {
  RippleTx
} = require('./XRPTx');

const {
  RippleSignTx
} = require('./XRPSign');

const {
  RippleSubmitTx
} = require('./XRPSubmitTx');

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
        new XRPWallet(this.args[1], this.args[2]);
        break;
      case 'build-transaction':
        new RippleTx(this.args[1], this.args[2], this.args[3], this.args[4]);
        break;
      case 'sign-transaction':
        new RippleSignTx();
        break;
      case 'submit-transaction':
        new RippleSubmitTx();
      case 'account-info':
        this.getAccountInfo(this.args[1]);
        break;
      case 'get-balance':
        this.getBalance(this.args[1]);
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