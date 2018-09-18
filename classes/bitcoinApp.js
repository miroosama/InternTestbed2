var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');
const request = require('request')
const axios = require('axios')
const BitcoinTransaction = require('./bitcoinTx')
const Wallet = require('./bitcoin.js')

class User {


const wallet = new Wallet()

wallet.createOrUpdateAccount("column capable stage auto obey twist bring correct crunch act penalty seminar goddess cage inflict pig route fence example cannon fragile puppy actual hedgehog","false")

console.log("BLAH", wallet.address)

 const bitcoinTx = new BitcoinTransaction()


wallet.createOrUpdateAccount("column capable stage auto obey twist bring correct crunch act penalty seminar goddess cage inflict pig route fence example cannon fragile puppy actual hedgehog", "true")




bitcoinTx.transactionBuilding('ebdf6971f3b09b565dc3cc11e0b3ea97c187912107d453dff07095dbd327fe20', "mfrU7eT9mXTSizqG1z2hynjKse8T9JNpiW", 300, wallet.changeAddr, 100, wallet.privateKey)

}




// console.log("HIIIIIIIIIOOOO",wallet.changeAddr)


//bitcoinTx.transactionBuilding(utxo, sendAddr, sendAMT, wallet.changeAddr, changeAMT, wallet.privateKey)

//the following transaction sends completed txhash
//bitcoinTx.transactionBuilding('966aa228397a9968894165d9adad2ced2d9492a178e6cd76401518dc2bfc5a5d', "mwxes15YzbWfpFhMtpbJRX7o8qd2vc4Ad3", 300, wallet.changeAddr, 100, wallet.privateKey)



// bitcoinTx.checkUTxO(wallet.address)



//transactionBuilding('61ba161083ccd17a0743539e4ed55a312eb356567a403fea40da350f365be4b8', [{address: 'mmGR83JQaV5cFkNmG8TcWERTjPu69kK6J5', amount:960000}, {address:"mpQCsG15rjAwA3mdfkyBnTenjD5zZdA5ws" , amount: 2000}], 'cSRSxzdgMtwKztMT6mcPhNVXv1xS6SvxsYkHjuFuimJ3fw8E1T76')