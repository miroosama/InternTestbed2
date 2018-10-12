const sign = require('ripple-sign-keypairs');
const fs = require('fs')
const {
  USBAdapter
} = require('../adapters/USBAdapter');

class RippleSignTx {
  constructor() {
    this.signTx();
  }

  async signTx() {
<<<<<<< HEAD:ripple-experiment/RIppleSignTx.js
    const usbPath = await USBAdapter.getPath().catch(err => {
      console.log(err)
    });
    this.UTX = JSON.parse(fs.readFileSync(`${usbPath}\UTX\\UTX.json`, 'utf8'));
    console.log(this.UTX)
    this.tx = this.UTX.tx;
    this.pubKey = this.UTX.pubKey;
    this.prvKey = fs.readFileSync(`ripple-experiment/keyDump/${this.pubKey}`, 'utf8');
=======
    const usbPath = await USBAdapter.getPath().catch(err => {console.log(err)});
    this.UTX = JSON.parse(fs.readFileSync(`${usbPath}\UTX\\UTX.json`,'utf8'));
    // console.log(this.UTX)
    this.tx = this.UTX.tx;
>>>>>>> fcc14438490c1140ac807db169393e2f9de7e305:ripple-experiment/XRPSign.js
    this.keyPair = {
      publicKey: this.UTX.pubKey,
      privateKey: fs.readFileSync(`ripple-experiment/keyDump/${this.UTX.pubKey}`,'utf8')
    }
    // console.log(this.keyPair)
    let txSign = sign(this.tx, this.keyPair);
    // console.log("trying to sign");
    // console.log(txSign);
    fs.writeFileSync(`${usbPath}/STX/STX.json`, JSON.stringify(txSign));
  }
}

module.exports = { RippleSignTx };