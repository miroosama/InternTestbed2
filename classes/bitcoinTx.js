var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');
const request = require('request')
const axios = require('axios')
const network = bitcoin.networks.testnet;
const { RPCAdapter } = require('../classes/RPCAdapter');



class BitcoinTransactions {

    constructor(){
        this.txhex = ""
    }

     checkUTxO(addr){

        // let apiUrl = "https://api.blockcypher.com/v1/btc/test3/addrs/" + addr
        // console.log(apiUrl)
        // axios({
        //     url: apiUrl
        //   })
        //   .then(function (resp) {
        //     console.log("Balance: ", resp.data)
        //   })

        
        RPCAdaptor.rpcPost("blockchain.scripthash.utxos", addr)

        }

         transactionBuilding(utxo, sendAddr, sendAMT, changeAddr, changeAMT, prk){
            let transaction = new bitcoin.TransactionBuilder(network)
               transaction.addInput(utxo, 0)
               transaction.addOutput(sendAddr, sendAMT)
               transaction.addOutput(changeAddr, changeAMT)
               let keypairSpend = bitcoin.ECPair.fromWIF(prk, network)
               transaction.sign(0, keypairSpend)
               let tx = transaction.build()
               this.txhex = tx.toHex();
               console.log(this.txhex)
              RPCAdaptor.rpcPost("sendrawtransaction", this.txhex)
              //  let rpc = new RPC()
            //    let params = [`${this.txhex}`]
              // rpc.rpcPost("sendrawtransaction", this.txhex)
            //    this.broadcastTx(this.txhex)
           }

}

module.exports = BitcoinTransactions;