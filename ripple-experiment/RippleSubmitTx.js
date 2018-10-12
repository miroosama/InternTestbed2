const RippleAPI = require('ripple-lib').RippleAPI;
const {
  USBAdapter
} = require('../adapters/USBAdapter');
const fs = require('fs');


const api = new RippleAPI({
  // server: 'wss://s1.ripple.com' // Public rippled server
  server: 'wss://s.altnet.rippletest.net:51233' // This is the Ripple testnet server 
});

class RippleSubmitTx {
  constructor() {
    this.run()
  }

  async run() {
    const usbPath = await USBAdapter.getPath().catch(err => {
      console.log(err)
    });
    this.STX = JSON.parse(fs.readFileSync(`${usbPath}\STX\\STX.json`));

    this.signedTx = this.STX.signedTransaction
    console.log(`${this.signedTx}`)
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