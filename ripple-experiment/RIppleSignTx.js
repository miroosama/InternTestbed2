const bip39 = require("bip39");
const bip32 = require("ripple-bip32");
const ripple = require('ripplelib');
const sign = require('ripple-sign-keypairs');

class RippleSignTx {
  constructor(tx, keyPair = "", secret = "") {
    this.tx = tx;
    // this.tx = {
    //   TransactionType: 'Payment',
    //   Account: 'rBrigaVC35RTUgpM8iKGx422UZ1TaaV6Ya',
    //   Fee: (0.000012 * 1000 * 1000) + '',
    //   Destination: 'rJGnEy4a5zYam8w8NwXw5Hxxj18XeBkpLG',
    //   DestinationTag: 2,
    //   Amount: (1 * 1000 * 1000) + '',
    //   Sequence: 0,
    //   maxLedgerVersionOffset: 5
    // };
    this.keyPair = {
      privateKey: '00C16E04B0782140BE072F1FEF44BCD09D4C7B6E7A5D4721C0C5CC12CC91D1DC0D',
      publicKey: '032B044728A7751E3E184BE07116E824285197D2A9F8902BE206A19146691A8F50'
    };
    // this.secret = "ssppaW1yBy4AUJ8BLHApEoaJNqHoS";
  }

  signTx() {
    // let txJSON = JSON.stringify(this.tx);
    let txSign = sign(this.tx, this.keyPair);
    console.log("trying to sign");
    console.log(txSign);
    return txSign;
  }

  // signTx() {
  //   let txJSON = JSON.stringify(this.tx);
  //   let txSign = sign(txJSON, this.secret);
  //   console.log("trying to sign")
  //   console.log(txSign);
  //   return txSign;
  // }

}

module.exports = {
  RippleSignTx
};

'rPEPPER7kfTD9w2To4CQk6UCfuHM9c6GDY'

"key.to_address_string()"

"npm run --silent cli sign-transaction rPqjUtmrY9JmfPoDVnBgjQkaDpxTPdzfPp sp6T5GywsDgzqzawedNkVNYiW1P8e rPEPPER7kfTD9w2To4CQk6UCfuHM9c6GDY 1"