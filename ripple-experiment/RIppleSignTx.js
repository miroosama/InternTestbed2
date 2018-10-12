const sign = require('ripple-sign-keypairs');
const fs = require('fs')
const { USBAdapter } = require('../adapters/USBAdapter');

class RippleSignTx {
  constructor() {
    this.signTx();
  }

  async signTx() {
    const usbPath = await USBAdapter.getPath().catch(err => {console.log(err)});
    this.UTX = JSON.parse(fs.readFileSync(`${usbPath}\UTX\\UTX.json`,'utf8'));
    // console.log(this.UTX)
    this.tx = this.UTX.tx;
    this.keyPair = {
      publicKey: this.UTX.pubKey,
      privateKey: fs.readFileSync(`ripple-experiment/keyDump/${this.UTX.pubKey}`,'utf8');
    }
    // console.log(this.keyPair)
    let txSign = sign(this.tx, this.keyPair);
    // console.log("trying to sign");
    // console.log(txSign);
    fs.writeFileSync(`${usbPath}/STX/STX.json`, JSON.stringify(txSign));
  }
}

module.exports = {
  RippleSignTx
};