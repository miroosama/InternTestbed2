const bip39 = require("bip39");
const bip32 = require("ripple-bip32");
const ripple = require('ripplelib');
const sign = require('ripple-sign-keypairs');

class RippleSignTx {
  constructor(tx) {
    this.tx = tx;
  }

  signTx() {
    let txJSON = JSON.stringify(tx);
    let txSign = sign(txJSON, keyPair);
    console.log(typeof txSign);
    console.log("trying to sign")
    return txSign;
  }
}

exports.modules = {
  RippleSignTx
};

'rPEPPER7kfTD9w2To4CQk6UCfuHM9c6GDY'

"key.to_address_string()"

"npm run --silent cli sign-transaction rPqjUtmrY9JmfPoDVnBgjQkaDpxTPdzfPp sp6T5GywsDgzqzawedNkVNYiW1P8e rPEPPER7kfTD9w2To4CQk6UCfuHM9c6GDY 1"