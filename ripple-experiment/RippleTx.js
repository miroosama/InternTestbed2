const bip39 = require("bip39");
const bip32 = require("ripple-bip32");
const ripple = require('ripplelib');
const sign = require('ripple-sign-keypairs');
const RippleAPI = require('ripple-lib').RippleAPI;

const api = new RippleAPI({
  // server: 'wss://s1.ripple.com' // Public rippled server
  server: 'wss://s.altnet.rippletest.net:51233' // This is the Ripple testnet server 
});

const {
  RippleWallet
} = require("./RippleWallet");

class RippleTx {
  constructor(account, secret, destination, amount = "") {
    this.account = account;
    this.secret = secret;
    this.destination = destination;
    this.amount = amount;
  }


  // buildTx() {
  //   let tx = {
  //     TransactionType: 'Payment',
  //     Account: this.account,
  //     Fee: (0.000012 * 1000 * 1000) + '',
  //     Destination: this.destination,
  //     DestinationTag: 2,
  //     Amount: (this.amount * 1000 * 1000) + '',
  //     Sequence: 0
  //   };

  async run() {
    await api.connect();

    const payment = {
      source: {
        address: this.account,
        maxAmount: {
          value: `${this.amount}`,
          currency: 'XRP'
        }
      },
      destination: {
        address: this.destination,
        amount: {
          value: `${this.amount}`,
          currency: 'XRP'
        }
      }
    };

    const prepared = await api.preparePayment(this.account, payment, {
      maxLedgerVersionOffset: 5
    });

    const tx = prepared.txJSON;

    api.disconnect();
    console.log(tx);
    // console.log(JSON.stringify(tx));
    return tx;
  }
}


module.exports = {
  RippleTx
};

'rPEPPER7kfTD9w2To4CQk6UCfuHM9c6GDY'

"key.to_address_string()"

"npm run --silent cli sign-transaction rPqjUtmrY9JmfPoDVnBgjQkaDpxTPdzfPp sp6T5GywsDgzqzawedNkVNYiW1P8e rPEPPER7kfTD9w2To4CQk6UCfuHM9c6GDY 1"