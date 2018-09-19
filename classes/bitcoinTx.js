var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');
const request = require('request')
const axios = require('axios')
const network = bitcoin.networks.testnet;
let coinSelect = require('coinselect')
const { RPCAdapter } = require('../classes/RPCAdapter');



class BitcoinTransactions {

    constructor(){
        this.utxos= "",
        this.txhex = "",
        this.inputs = "",
        this.outputs = ""
    }


    // sendAddr, sendAMT, changeAddress, privateKey
    async checkUTxO(addr, sendAddr, sendAMT, changeAddress, privateKey){
        let apiUrl = "https://api.blockcypher.com/v1/btc/test3/addrs/" + addr
        console.log(apiUrl)
        const response = await axios({
            url: apiUrl
          }).then(function (resp) {
              return resp
          }).catch(error => {
            console.log(error)
        });
            // this.transactionBuilding(sendAddr, sendAMT, changeAddress, privateKey)
            // console.log(this.utxos)
           console.log(response.data.txrefs)
           this.transactionBuilding(response.data.txrefs, sendAddr, sendAMT, changeAddress, privateKey)
        }

        // RPCAdaptor.post("blockchain.scripthash.utxos", addr)

         transactionBuilding(utxos, sendAddr, sendAMT, changeAddr, prk){
           let finalUTXO = []
           for(let i = 0; i < utxos.length; i++){
              finalUTXO.push({txId: utxos[i].tx_hash, vout: 0, block_height: utxos[i].block_height, confirmations: utxos[i].confirmations, confirmed: utxos[i].confirmed, double_spend: utxos[i].double_spend, value:utxos[i].value})
           }
            let feeRate = 55
            let targets = [
              {
                address: sendAddr, 
                value: sendAMT
              }
            ]
            console.log(finalUTXO)
            let coinReturn = coinSelect(finalUTXO, targets, feeRate)
            let transaction = new bitcoin.TransactionBuilder(network)
            console.log(coinReturn)
              //  transaction.addInput(utxo, 0)
               inputs.forEach(input => transaction.addInput(input.txId, input.vout))
               outputs.forEach(output => {
                 if(!output.address) {
                output.address = changeAddr
                 }
                 transaction.addOutput(output.address, output.value)
               })
               let keypairSpend = bitcoin.ECPair.fromWIF(prk, network)
               transaction.sign(0, keypairSpend)
               let tx = transaction.build()
               this.txhex = tx.toHex();
               console.log(this.txhex)
              // RPCAdaptor.post("sendrawtransaction", this.txhex)
              //  let rpc = new RPC()
            //    let params = [`${this.txhex}`]
              // rpc.rpcPost("sendrawtransaction", this.txhex)
            //    this.broadcastTx(this.txhex)
           }

}

module.exports = BitcoinTransactions;