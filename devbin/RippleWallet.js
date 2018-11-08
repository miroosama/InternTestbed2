const bip39 = require("bip39");
const bip32 = require("ripple-bip32");
const ripple = require('ripplelib');
const sign = require('ripple-sign-keypairs');

// var mnemonic = 'novel matter final only nice cheese address cradle civil crash great flame struggle consider crowd surface purpose saddle mango endless mixed trial tape wrap'
// Or generate:
// mnemonic = bip39.generateMnemonic()

class RippleWallet {
  constructor(mnemonic) {
    // super();
    this.mnemonic = mnemonic;
    this.keyPair = "";
  }

  createAccount() {
    console.log(this.mnemonic)
    const seed = bip39.mnemonicToSeed(this.mnemonic);
    console.log('seedHex:  ', seed.toString('hex'))
    const m = bip32.fromSeedBuffer(seed);
    const keyPair = m.derivePath("m/44'/144'/0'/0/0").keyPair.getKeyPairs();
    this.keyPair = keyPair;
    const key = ripple.KeyPair.from_json(keyPair.privateKey.substring(2))
    console.log(m);

    console.log('privateKey: ' + keyPair.privateKey)
    console.log('privateKeyWif: ' + key.to_pri_string()) // to_wif
    console.log('publicKey: ' + keyPair.publicKey)
    const address = key.to_address_string();
    console.log(address);
    console.log(keyPair);
    return address;
    // console.log('address: ' + key.to_address_string())
    // return key.to_address_string();

  }
}

// const rippleWallet = new RippleWallet();
// rippleWallet.createAccount();

module.exports = {
  RippleWallet
}