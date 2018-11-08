const bip39 = require("bip39");
const bip32 = require("ripple-bip32");
const ripple = require('ripplelib')
const sign = require('ripple-sign-keypairs')

var mnemonic = 'novel matter final only nice cheese address cradle civil crash great flame struggle consider crowd surface purpose saddle mango endless mixed trial tape wrap'
// Or generate:
// mnemonic = bip39.generateMnemonic()

console.log('mnemonic: ' + mnemonic)
const seed = bip39.mnemonicToSeed(mnemonic)
const m = bip32.fromSeedBuffer(seed)
const keyPair = m.derivePath("m/44'/144'/0'/0/0").keyPair.getKeyPairs()
const key = ripple.KeyPair.from_json(keyPair.privateKey.substring(2))

console.log('privateKey: ' + keyPair.privateKey)
console.log('privateKeyWif: ' + key.to_pri_string()) // to_wif
console.log('publicKey: ' + keyPair.publicKey)
console.log('address: ' + key.to_address_string())

// Now sign a transaction...
var tx = {
  TransactionType: 'Payment',
  Account: key.to_address_string(),
  Fee: (0.000012 * 1000 * 1000) + '',
  Destination: 'rPEPPER7kfTD9w2To4CQk6UCfuHM9c6GDY',
  DestinationTag: 2,
  Amount: (1 * 1000 * 1000) + '',

  Sequence: 0
}
var txJSON = JSON.stringify(tx)
var txSign = sign(txJSON, keyPair)

console.log(txSign);
return txSign