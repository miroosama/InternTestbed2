const bip39 = require("bip39");
const bip32 = require("ripple-bip32");
const ripple = require('ripplelib');
const sign = require('ripple-sign-keypairs');

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

  buildTx() {
    let tx = {
      TransactionType: 'Payment',
      Account: this.account,
      Fee: (0.000012 * 1000 * 1000) + '',
      Destination: this.destination,
      DestinationTag: 2,
      Amount: (this.amount * 1000 * 1000) + '',
      // Amount: (1 * 1000 * 1000) + '',
      Sequence: 0
    };
    console.log(tx);
    return tx;
  }
}

module.exports = {
  RippleTx
};

'rPEPPER7kfTD9w2To4CQk6UCfuHM9c6GDY'

"key.to_address_string()"

"npm run --silent cli sign-transaction rPqjUtmrY9JmfPoDVnBgjQkaDpxTPdzfPp sp6T5GywsDgzqzawedNkVNYiW1P8e rPEPPER7kfTD9w2To4CQk6UCfuHM9c6GDY 1"