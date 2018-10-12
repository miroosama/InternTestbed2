const fs = require('fs')
const RippleAPI = require('ripple-lib').RippleAPI;
<<<<<<< HEAD:ripple-experiment/RippleSubmitTx.js
const {
  USBAdapter
} = require('../adapters/USBAdapter');
const fs = require('fs');


const api = new RippleAPI({
  // server: 'wss://s1.ripple.com' // Public rippled server
  server: 'wss://s.altnet.rippletest.net:51233' // This is the Ripple testnet server 
});
=======
const { USBAdapter } = require('../adapters/USBAdapter');

>>>>>>> fcc14438490c1140ac807db169393e2f9de7e305:ripple-experiment/XRPSubmitTx.js

class RippleSubmitTx {
  constructor() {
    this.run()
  }

  async run() {
<<<<<<< HEAD:ripple-experiment/RippleSubmitTx.js
    const usbPath = await USBAdapter.getPath().catch(err => {
      console.log(err)
    });
=======
    const api = new RippleAPI({
      // This is the Ripple testnet server 
      server: 'wss://s.altnet.rippletest.net:51233' 
    });
    const usbPath = await USBAdapter.getPath().catch(err => {console.log(err)});
>>>>>>> fcc14438490c1140ac807db169393e2f9de7e305:ripple-experiment/XRPSubmitTx.js
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

module.exports = { RippleSubmitTx };