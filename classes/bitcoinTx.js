var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');
const request = require('request')
const axios = require('axios')
const network = bitcoin.networks.testnet;
const RPC = require('./rpcAdapter.js')


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

        let rpc = new RPC()
        rpc.rpcPost("blockchain.scripthash.utxos", addr)

        }

         transactionBuilding(utxo, sendAddr, sendAMT, changeAddr, changeAMT, prk){
            let transaction = new bitcoin.TransactionBuilder(network)
               transaction.addInput(utxo, 0)
               // for(let i = 0; i < outputs.length; i++){
               //     transaction.addOutput(outputs[i].address, outputs[i].amount)
               // }
               transaction.addOutput(sendAddr, sendAMT)
               transaction.addOutput(changeAddr, changeAMT)
               let keypairSpend = bitcoin.ECPair.fromWIF(prk, network)
               transaction.sign(0, keypairSpend)
               let tx = transaction.build()
               this.txhex = tx.toHex();
               console.log(this.txhex)
              //  let rpc = new RPC()
            //    let params = [`${this.txhex}`]
              // rpc.rpcPost("sendrawtransaction", this.txhex)
            //    this.broadcastTx(this.txhex)
           }


         //'https://api.blockcypher.com/v1/bcy/test/txs/push'
         // https://chain.so/api/v2/send_tx/{NETWORK}
         
        //  broadcastTx(txhex){
        //      axios({
        //          method: 'post',
        //          url: `https://api.blockcypher.com/v1/bcy/test/txs/push`,
        //          data: {
        //              tx_hex: `${txhex}`
        //          }
        //        }).then(function(response) {
        //          console.log(response.data);
        //          console.log(response.status);
        //        }).catch(function(error){
        //            console.log(error)
        //        });

        //     }

}

module.exports = BitcoinTransactions;