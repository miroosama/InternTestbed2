const sign = require('ripple-sign-keypairs');
const fs = require('fs');
const {
  USBAdapter
} = require('../adapters/USBAdapter');

class RippleSignTx {
  constructor() {
    this.signTx();
  }

  async signTx() {
    const usbPath = await USBAdapter.getPath().catch(err => {
      console.log(err)
    });
    this.UTX = JSON.parse(fs.readFileSync(`${usbPath}\UTX\\UTX.json`, 'utf8'));
    this.tx = this.UTX.tx;
    this.pubKey = this.UTX.pubKey;
    this.prvKey = fs.readFileSync(`ripple-experiment/keyDump/${this.pubKey}`, 'utf8');
    this.keyPair = {
      publicKey: this.pubKey,
      privateKey: this.prvKey
    }
    let txSign = sign(this.tx, this.keyPair);
    console.log("trying to sign");
    console.log(txSign);
    fs.writeFileSync(`${usbPath}/STX/STX.json`, JSON.stringify(txSign));
  }
}

module.exports = {
  RippleSignTx
};