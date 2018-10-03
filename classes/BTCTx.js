var bitcoin = require('bitcoinjs-lib');
const axios = require('axios')
const network = bitcoin.networks.testnet;
const coinSelect = require('./coinselect/coinSelect.js')
const { RPCAdapter } = require('../classes/classbin/RPCAdapter');
const { TelnetAdapter } = require('./TelnetAdapter.js')
const Sign = require('./BTCSignTx')
var fs = require('fs')

class BTCTx {
    constructor(node){
        this.node = bitcoin.bip32.fromBase58(JSON.parse(node), network),
        this.scripthash = "",
        this.currentAddress = 0,
        this.changeAddr = 0,
        this.totalBal = 0,
        this.intOrExtInd = 0,
        this.addresses = [],
        this.switch = false
    }

    test(){
      let n = this.node.derive(1).derive(0)
      console.log(this.node)
      console.log(bitcoin.payments.p2pkh({ pubkey: n.publicKey, network }).address)
    }



    async accountInfo(){
      let telLoop = true;
      while(telLoop == true){
        // console.log(this.currentAddress, "AHAHAHAHAHHAHAHAAH")
        
        let childNode = this.node.derive(this.intOrExtInd).derive(!this.switch ? this.currentAddress : this.changeAddr)
        let address = bitcoin.payments.p2pkh({ pubkey: childNode.publicKey, network }).address
        let telnetAdapter = new TelnetAdapter()
      let response = await telnetAdapter.telnetConstructor("blockchain.address.get_history", address).then(function (resp) {
        console.log("Address History: ", resp.result)
        return resp
      }).catch(error => {
        console.log(error)
    });
    if(response.result.length != 0){
      console.log(response, "AHHHHHHHHHHHHHHHHHHHHHHHH")
      this.currentAddress += 1;
      this.addresses.push(address)
    }  
    else if(response.result.length == 0 && this.intOrExtInd !== 1){
      this.switch = true
      this.intOrExtInd = 1
      let childNode = this.node.derive(this.intOrExtInd).derive(this.changeAddr)
      let address = bitcoin.payments.p2pkh({ pubkey: childNode.publicKey, network }).address
      this.changeAddr += 1
      this.addresses.push(address)
    } else if (response.result.length == 0 && this.intOrExtInd == 1) {
      telLoop = false
    }
    console.log(this.currentAddress, this.changeAddr)
  }
    // return response.result
    // this.checkUTxO()
    this.getBalance()
    
}

     async getBalance(){
       this.intOrExtInd = 0
       
        for(let i = 0; i < this.addresses.length; i++){
        let telnetAdapt = new TelnetAdapter()
        let response = await telnetAdapt.telnetConstructor("blockchain.address.get_balance", this.addresses[i]).then(function (resp) {
          console.log("Balance: ", resp.result.confirmed)
          return resp
        }).catch(error => {
          console.log(error)
      });
      this.totalBal += response.result.confirmed
     }
      console.log(this.totalBal)
    }

    // sendAddr, sendAMT, changeAddress, privateKey
    async checkUTxO(){
      let utxos = [];
      for(let i = 0; i < this.addresses.length; i++){
        let telnetAdapt = new TelnetAdapter()
        let response = await telnetAdapt.telnetConstructor("blockchain.address.listunspent", this.addresses[i]).then(function (resp) {
          console.log("Unspent: ", resp.result)
          if(resp.result.length > 0){
            utxos.push(resp.result)
          }
          return resp
        }).catch(error => {
          console.log(error)
      });
      }
       let utxoData = utxos.reduce((acc, val) => acc.concat(val), [])
        this.transactionBuilding(utxoData, "mfrU7eT9mXTSizqG1z2hynjKse8T9JNpiW", 10000).catch(error => {
        console.log(error)
      });
    }

    async transactionBuilding(utxoData, sendAddr, sendAMT){
      let changeAddress = this.addresses[this.addresses.length-1]
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
            output.address = changeAddress
          }
          transaction.addOutput(output.address, output.value)
        })
        let signed = new Sign(transaction)
        signed.signTx()
    }

    async broadcastTx(txhex){
      let telnetAdaptor = new TelnetAdapter()
      let response = await telnetAdaptor.telnetConstructor("blockchain.transaction.broadcast", txhex).then(function (resp) {
        console.log(resp)
        return resp
      }).catch(error => {
        console.log(error)
    });
    }
  }

  let account = fs.readFileSync('../classes/accounts/tpubDFe6R4ftoEmXJyTBufCo5gzZR41Xkuhegyqt2XQuc5WiZ27yJtq4V3T2nJr2yVNbU3jJmpYCiSiwH7k4QJkqNKqrA1crMQksucUcKQjTDF6.json', 'utf8')

  let btctx = new BTCTx(account)
  btctx.accountInfo()

  // tpubDFe6R4ftoEmXJyTBufCo5gzZR41Xkuhegyqt2XQuc5WiZ27yJtq4V3T2nJr2yVNbU3jJmpYCiSiwH7k4QJkqNKqrA1crMQksucUcKQjTDF6