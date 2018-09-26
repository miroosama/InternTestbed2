var bitcoin = require('bitcoinjs-lib');
const axios = require('axios')
const network = bitcoin.networks.testnet;
const coinSelect = require('./coinselect/coinSelect.js')
const { RPCAdapter } = require('../classes/classbin/RPCAdapter');
const { TelnetAdapter } = require('./TelnetAdapter.js')

exports.BTCTx = (() => {
  return class {
    constructor(){
        this.utxos= "",
        this.txhex = "",
        this.inputs = "",
        this.outputs = ""
    }

     async getBalance(addr, scripthash){
        let telnetAdapter = new TelnetAdapter()
        console.log(addr)
        let bal = await telnetAdapter.telnetConstructor("blockchain.address.get_balance", addr).then(function (resp) {
          console.log("Balance: ", resp.result.confirmed)
          return resp
        }).catch(error => {
          console.log(error)
      });
      return bal.result.confirmed
    }

    // sendAddr, sendAMT, changeAddress, privateKey
    async checkUTxO(sendAddr, sendAMT, changeAddress, privateKey, scripthash){
          let telnetAdapt = new TelnetAdapter()
          let response = await telnetAdapt.telnetConstructor("blockchain.scripthash.listunspent", scripthash).then(function (resp) {
            console.log("Unspent: ", resp)
            return resp
          }).catch(error => {
            console.log(error)
        });
          this.transactionBuilding(response.result, sendAddr, sendAMT, changeAddress, privateKey).catch(error => {
          console.log(error)
        });
    }

        // RPCAdaptor.post("blockchain.scripthash.utxos", addr)

        // block_height: utxos[i].block_height, confirmations: utxos[i].confirmations, confirmed: utxos[i].confirmed, double_spend: utxos[i].double_spend

        // confirmations: utxoData[i].confirmations, confirmed: utxoData[i].confirmed, double_spend: utxoData[i].double_spend, 
    async transactionBuilding(utxoData, sendAddr, sendAMT, changeAddr, prk){
        let utxos = []
        for(let i = 0; i < utxoData.length; i++){
          utxos.push({txId: utxoData[i].tx_hash, vout: 1, value: utxoData[i].value})
        }
        console.log(utxos)
        let feeRate = 55
        let amount = parseInt(sendAMT)
        let targets = [
          {
            address: sendAddr, 
            value: amount
          }
        ]
        console.log(targets)

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
        let params = [`${this.txhex}`]

      let telnetAdaptor = new TelnetAdapter()
      let response = await telnetAdaptor.telnetConstructor("blockchain.transaction.broadcast", this.txhex).then(function (resp) {
        console.log(resp)
        return resp
      }).catch(error => {
        console.log(error)
    });
    }
  }
})();

// human sun wall return tragic bless detail foot rescue gown deer clerk body certain casual