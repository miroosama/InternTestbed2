var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');
const request = require('request')
const axios = require('axios')
const BitcoinTransaction = require('../classes/bitcoinTx')
const Wallet = require('../classes/bitcoin.js')


const wallet = new Wallet()

wallet.createOrUpdateAccount("fun swamp jump history obvious scare struggle deputy cannon village buzz state power play expose moral million lift gravity size chalk grocery scout toss", "false")

console.log("BLAH", wallet.address)

const bitcoinTx = new BitcoinTransaction()

// bitcoinTx.checkUTxO(wallet.address)



wallet.createOrUpdateAccount("column capable stage auto obey twist bring correct crunch act penalty seminar goddess cage inflict pig route fence example cannon fragile puppy actual hedgehog", "true")


//bitcoinTx.transactionBuilding(utxo, sendAddr, sendAMT, wallet.changeAddr, changeAMT, wallet.privateKey)


bitcoinTx.transactionBuilding('594b9e09c3ecffc9a4c43a6ae16790ac928f9d40aebf83179425afcd11be66b0', "n42A3CDhFCHAVjaznedDErm9EhsofjGWNX", 7000, wallet.changeAddr, 800, wallet.privateKey)




// console.log("HIIIIIIIIIOOOO",wallet.changeAddr)






//transactionBuilding('61ba161083ccd17a0743539e4ed55a312eb356567a403fea40da350f365be4b8', [{address: 'mmGR83JQaV5cFkNmG8TcWERTjPu69kK6J5', amount:960000}, {address:"mpQCsG15rjAwA3mdfkyBnTenjD5zZdA5ws" , amount: 2000}], 'cSRSxzdgMtwKztMT6mcPhNVXv1xS6SvxsYkHjuFuimJ3fw8E1T76')