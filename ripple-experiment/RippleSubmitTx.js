const bip39 = require("bip39");
const bip32 = require("ripple-bip32");
const ripple = require('ripplelib');
const sign = require('ripple-sign-keypairs');
const RippleAPI = require('ripple-lib').RippleAPI;

const api = new RippleAPI({
  // server: 'wss://s1.ripple.com' // Public rippled server
  server: 'wss://s.altnet.rippletest.net:51233' // This is the Ripple testnet server 
});

class RippleSubmitTx {
  constructor(signedTx) {
    this.signedTx = signedTx;
  }

  async run() {
    await api.connect();

    const res = await api.submit(this.signedTx);

    console.log('Done', res);

    api.disconnect();
    process.exit(0);
  }
}

module.exports = {
  RippleSubmitTx
};