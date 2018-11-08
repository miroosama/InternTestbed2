const bip39 = require('bip39');
const bip32 = require('ripple-bip32');
const RippleAPI = require('ripple-lib').RippleAPI;
var pbkdf2 = require('pbkdf2').pbkdf2Sync
var unorm = require('unorm')
const crypto = require('crypto')
const bs58check = require('bs58check')

const buf1 = Buffer.alloc(16)
const hash = crypto.createHash('sha512')
hash.update('novel matter final only nice cheese address cradle civil crash great flame struggle consider crowd surface purpose saddle mango endless mixed trial tape wrap')
// console.log(hash.read())
const value = hash.digest().toString('hex')
buf1.write(value, 'hex')
console.log(buf1)
console.log(buf1.toString('hex'))






// const seed = bip39.mnemonicToSeed('masterpassphrase');\
// const bufferPrep = unorm.nfkd('masterpassphrase')
// console.log(bufferPrep.toString('hex'))
// var mnemonicBuffer = Buffer.from(bufferPrep, 'utf8')
// console.log(mnemonicBuffer.toString('hex'))
// const seed = pbkdf2(mnemonicBuffer,Buffer.from(''),0,128,'sha512')
// console.log(seed.toString('hex'))
// const m = bip32.fromSeedBuffer(seed);
// console.log(m)
// const api = new RippleAPI();

// const keyPair = api.deriveKeypair('snoPBrXtMeMyMHUVTgbuqAfg1SUTb')
// console.log(keyPair)





// class RippleTx {
//     constructor(account, secret, destination, amount = "") {
//       this.account = account;
//       this.secret = secret;
//       this.destination = destination;
//       this.amount = amount;
//     }
//     buildTx() {
//       let tx = {
//         TransactionType: 'Payment',
//         Account: this.account,
//         Fee: (0.000012 * 1000 * 1000) + '',
//         Destination: this.destination,
//         DestinationTag: 2,
//         Amount: (this.amount * 1000 * 1000) + '',
//         Sequence: 0
//       };
//       console.log(tx);
//       return tx;
//     }
//   }
// const txr = new RippleTx('rGQqGU8TtM3aLs6QGjhCyAphE11gaboy4H', 'spi5n1yQAkpAF4u47vqfmkwbJmLXA','rPEPPER7kfTD9w2To4CQk6UCfuHM9c6GDY',4)
// const signedtx = `${JSON.stringify(txr.buildTx())}`
// console.log(signedtx)
// const signed = api.sign(signedtx, 'spi5n1yQAkpAF4u47vqfmkwbJmLXA')
// console.log(signed)
// api.submit(signed).then(resp=>console.log(resp)).catch(err=>console.log(err))