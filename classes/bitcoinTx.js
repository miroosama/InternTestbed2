var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');
const request = require('request')
const axios = require('axios')
const network = bitcoin.networks.testnet;
const User = require('./bitcoinApp')

// const coinSelect = require('coinselect/blackjack')
const coinSelect = require('./coinSelect.js')

const { RPCAdapter } = require('../classes/RPCAdapter');



class BitcoinTransactions {

    constructor(){
        this.utxos= "",
        this.txhex = "",
        this.inputs = "",
        this.outputs = ""
    }

    async getBalance(addr, mnemonic){
              let apiUrl = "https://api.blockcypher.com/v1/btc/test3/addrs/" + addr
        console.log(apiUrl)
        const bal = await axios({
            url: apiUrl
          })
          .then(function (resp) {
            console.log("Balance: ", resp.data.balance)
            return resp.data.balance
          }).catch(error => {
            console.log(error)
        });
        return bal
    }


    // sendAddr, sendAMT, changeAddress, privateKey
    async checkUTxO(addr, sendAddr, sendAMT, changeAddress, privateKey, scripthash){
        let apiUrl = "https://api.blockcypher.com/v1/btc/test3/addrs/" + addr
        console.log(apiUrl)
        const response = await axios({
            url: apiUrl
          }).then(function (resp) {
              return resp
          }).catch(error => {
            console.log(error)
        });
          //   RPCAdapter.post("blockchain.scripthash.utxos", scripthash)
          //  this.transactionBuilding(response.data.txrefs,sendAddr, sendAMT, changeAddress, privateKey).catch(error => {
          //   console.log(error)
        // });
        }

        // RPCAdaptor.post("blockchain.scripthash.utxos", addr)

        // block_height: utxos[i].block_height, confirmations: utxos[i].confirmations, confirmed: utxos[i].confirmed, double_spend: utxos[i].double_spend

          async transactionBuilding(utxoData, sendAddr, sendAMT, changeAddr, prk){
           let utxos = []
           for(let i = 0; i < utxoData.length; i++){
              utxos.push({txId: utxoData[i].tx_hash, vout: 1, block_height: utxoData[i].block_height, confirmations: utxoData[i].confirmations, confirmed: utxoData[i].confirmed, double_spend: utxoData[i].double_spend, value:utxoData[i].value})
           }
            let feeRate = 15
            let amount = parseInt(sendAMT)
            let targets = [
              {
                address: sendAddr, 
                value: amount
              }
            ]
            console.log(targets)
            // let utxos = [ { txId: '0ba9a0e797c2af0c5715552a8d2f28606fba8c9909c726cb8f9bc73e285e3dc4',
            //  vout: 1,
            //  value: 4230000 } ]
            let { inputs, outputs, fee } = coinSelect(utxos, targets, feeRate)
            if (!inputs) throw new Error('No valid Transaction exists')
            let transaction = new bitcoin.TransactionBuilder(network)
            // console.log(utxos)
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
               RPCAdaptor.post("blockchain.transaction.broadcast", this.txhex, 8000)
              //  let rpc = new RPC()
            //    let params = [`${this.txhex}`]
              // rpc.rpcPost("sendrawtransaction", this.txhex)
              //  this.broadcastTx(this.txhex)
           }

}

module.exports = BitcoinTransactions;

// human sun wall return tragic bless detail foot rescue gown deer clerk body certain casual