var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');
const request = require('request')
const axios = require('axios')
const BitcoinTransaction = require('./bitcoinTx')
const Wallet = require('./bitcoin.js')

const wallet = new Wallet()

wallet.createOrUpdateAccount("column capable stage auto obey twist bring correct crunch act penalty seminar goddess cage inflict pig route fence example cannon fragile puppy actual hedgehog","false")

console.log("BLAH", wallet.address)

const bitcoinTx = new BitcoinTransaction()

bitcoinTx.checkUTxO(wallet.address)

//wallet.createOrUpdateAccount("column capable stage auto obey twist bring correct crunch act penalty seminar goddess cage inflict pig route fence example cannon fragile puppy actual hedgehog", "true")


//bitcoinTx.transactionBuilding(utxo, sendAddr, sendAMT, wallet.changeAddr, changeAMT, wallet.privateKey)


bitcoinTx.transactionBuilding('966aa228397a9968894165d9adad2ced2d9492a178e6cd76401518dc2bfc5a5d', "n1h4g9FkQe2N68uY5cwQFHcweGhGqSK78v", 900, "cRyUBkZgD44iSxw844fAB2RnfnW3H7XencuEwbuUk1iXJ2Xw2sT6")




// console.log("HIIIIIIIIIOOOO",wallet.changeAddr)






//transactionBuilding('61ba161083ccd17a0743539e4ed55a312eb356567a403fea40da350f365be4b8', [{address: 'mmGR83JQaV5cFkNmG8TcWERTjPu69kK6J5', amount:960000}, {address:"mpQCsG15rjAwA3mdfkyBnTenjD5zZdA5ws" , amount: 2000}], 'cSRSxzdgMtwKztMT6mcPhNVXv1xS6SvxsYkHjuFuimJ3fw8E1T76')