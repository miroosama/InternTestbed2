const bip39 = require("bip39");
const bip32 = require("ripple-bip32");

// const mnemonic = bip39.generateMnemonic()
const mnemonic = 'novel matter final only nice cheese address cradle civil crash great flame struggle consider crowd surface purpose saddle mango endless mixed trial tape wrap'
console.log('mnemonic: ', mnemonic)

const seed = bip39.mnemonicToSeed(mnemonic)
console.log('seedHex:  ', seed.toString('hex'))

const foo = bip32.fromSeedBuffer(seed)
const rootKey = foo.toBase58()
console.log('rootKey:  ', rootKey)
const m = bip32.fromBase58(rootKey)

for (let i = 0; i < 3; i++) {
  // gets extPriv
  console.log('xPriv:    ', m.derivePath(`m/44'/144'/${i}'`).toBase58())

  // gets extPub 
  console.log('xPub:     ', m.derivePath(`m/44'/144'/${i}'`).neutered().toBase58())

  // gets address
  console.log('address:  ', m.derivePath(`m/44'/144'/${i}'/0/0`).getAddress())

  // gets address priv/pub
  console.log('addr keyPair: ', m.derivePath(`m/44'/144'/${i}'/0/0`).keyPair.getKeyPairs())
}