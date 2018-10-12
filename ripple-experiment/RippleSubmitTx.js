const fs = require('fs')
const RippleAPI = require('ripple-lib').RippleAPI;
const { USBAdapter } = require('../adapters/USBAdapter');


class RippleSubmitTx {
  constructor() {
    this.run()
  }

  async run() {
    const api = new RippleAPI({
      // This is the Ripple testnet server 
      server: 'wss://s.altnet.rippletest.net:51233' 
    });
    const usbPath = await USBAdapter.getPath().catch(err => {console.log(err)});
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