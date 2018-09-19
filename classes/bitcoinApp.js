var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');
const request = require('request')
const axios = require('axios')
const BitcoinTransaction = require('./bitcoinTx')
const Wallet = require('./bitcoin.js')
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })


class User {
    constructor(){
        this.mnemonic = ""
        this.firstAddress = "",
        this.privateKey = "",
        this.changeAddress = "",
        this.scripthash = ""
    }

    startSession(){
        rl.question("Sign in with mnemonic: ", (answer) =>{
            switch(answer){
                default:
                    this.mnemonic = answer
                    this.createWallet(answer, "false")
            }
        })
    }

    createWallet(mnemonic, val){
    const wallet = new Wallet()
    wallet.createOrUpdateAccount(mnemonic, val)
    wallet.createOrUpdateAccount(mnemonic, "true")
    this.firstAddress = wallet.address
    this.privateKey = wallet.privateKey
    this.changeAddress = wallet.changeAddr
    this.scripthash = wallet.scripthash
    this.sendMoney()
    }

    sendMoney(){
        console.log(this.firstAddress)
        rl.question("Send bitcoin address: ", (answer) =>{
            rl.question("Send bitcoin amount: " , (answer2) =>{
                    this.sendTransaction(answer, answer2)
            })
        })
    }

    sendTransaction(sendAddr, sendAMT){
        console.log("hereeee", sendAddr, sendAMT, this.scripthash)
        // const bitcoinTx = new BitcoinTransaction()
        // this.changeAddress = wallet.changeAddr
        // bitcoinTx.transactionBuilding(utxo, sendAddr, sendAMT, this.changeAddress, changeAMT, this.privateKey)  
        rl.close()
      }
}

const user = new User()
user.startSession()


// console.log("HIIIIIIIIIOOOO",wallet.changeAddr)


//bitcoinTx.transactionBuilding(utxo, sendAddr, sendAMT, wallet.changeAddr, changeAMT, wallet.privateKey)

//the following transaction sends completed txhash
//bitcoinTx.transactionBuilding('966aa228397a9968894165d9adad2ced2d9492a178e6cd76401518dc2bfc5a5d', "mwxes15YzbWfpFhMtpbJRX7o8qd2vc4Ad3", 300, wallet.changeAddr, 100, wallet.privateKey)



// bitcoinTx.checkUTxO(wallet.address)



//transactionBuilding('61ba161083ccd17a0743539e4ed55a312eb356567a403fea40da350f365be4b8', [{address: 'mmGR83JQaV5cFkNmG8TcWERTjPu69kK6J5', amount:960000}, {address:"mpQCsG15rjAwA3mdfkyBnTenjD5zZdA5ws" , amount: 2000}], 'cSRSxzdgMtwKztMT6mcPhNVXv1xS6SvxsYkHjuFuimJ3fw8E1T76')

// const wallet = new Wallet()
// wallet.createOrUpdateAccount("column capable stage auto obey twist bring correct crunch act penalty seminar goddess cage inflict pig route fence example cannon fragile puppy actual hedgehog","false")
// }
// console.log("BLAH", wallet.address)

//  const bitcoinTx = new BitcoinTransaction()


// wallet.createOrUpdateAccount("column capable stage auto obey twist bring correct crunch act penalty seminar goddess cage inflict pig route fence example cannon fragile puppy actual hedgehog", "true")

// bitcoinTx.transactionBuilding('ebdf6971f3b09b565dc3cc11e0b3ea97c187912107d453dff07095dbd327fe20', "mfrU7eT9mXTSizqG1z2hynjKse8T9JNpiW", 300, wallet.changeAddr, 100, wallet.privateKey)



// "{\"id\":\"myquery\",\"method\":\"getaddressbalance\",\"params\":[\"14vuRY354EaxDu4WrgjtvoDEwntDNwMVbx\"]}

// "{\"jsonrpc\":\"1.0\",\"id\":\"interns\",\"method\":\"getbalance\",\"params\": [\"\"]   }" 18.222.107.97:50001

// curl --user btcuser:btcpassword --data-binary "{\"jsonrpc\":\"1.0\",\"id\":\"interns\",\"method\":\"getaddressbalance\",\"params\":[\"mwxes15YzbWfpFhMtpbJRX7o8qd2vc4Ad3\"]} 18.222.107.97:50001

// electrumx_rpc env DB_DIRECTORY=/data/db/ RPC_HOST=0.0.0.0 HOST= TCP_PORT=50001 DAEMON_URL=http://btcuser:btcpassword@127.0.0.1:18332 COIN=BitcoinSegwit NET=testnet /usr/local/bin/electrumx_server.py > ~/electrumx_server.log 2>&1 &


// {"jsonrpc": "1.0", "id": "interns", "method":"blockchain.transaction.get","params":["fc992bd10bbcbd54ee2279de497ad4bd49ce6a64c27f2a2d3293f761d2a5a3a3"]}
