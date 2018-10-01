var bitcoin = require('bitcoinjs-lib');
const axios = require('axios')
const network = bitcoin.networks.testnet;
const coinSelect = require('./coinselect/coinSelect.js')
const { RPCAdapter } = require('../classes/classbin/RPCAdapter');
const { TelnetAdapter } = require('./TelnetAdapter.js')
const Sign = require('./BTCSignTx')

class BTCTx {
    constructor(accountExtendedPublicKey){
        this.pub = accountExtendedPublicKey,
        this.node = bitcoin.bip32.fromBase58(accountExtendedPublicKey, network),
        this.scripthash = "",
        this.currentAddress = 0,
        this.changeAddr = 0
    }

    test(){
      // console.log(bitcoin)
      // bitcoin.bip32.fromBase58(accountExtendedPublicKey, network).derive(2)
      console.log(this.node)
      console.log(bitcoin.payments.p2pkh({ pubkey: this.node.publicKey, network }).address)
      let address = bitcoin.payments.p2pkh({ pubkey: this.node.publicKey, network }).address
      let script = bitcoin.address.toOutputScript(address, network)
      let hash = bitcoin.crypto.sha256(Buffer.from(script))
      let reversedHash = hash.reverse()
      this.scripthash = reversedHash.toString('hex')
      // this.getBalance()
      this.accountInfo()
    }

    async accountInfo(){
      let telLoop = true;
      while(telLoop == true){
        // console.log(this.currentAddress, "AHAHAHAHAHHAHAHAAH")
        let childNode = this.node.derive(this.currentAddress)
        let address = bitcoin.payments.p2pkh({ pubkey: childNode.publicKey, network }).address
        let telnetAdapter = new TelnetAdapter()
      let response = await telnetAdapter.telnetConstructor("blockchain.address.get_history", address).then(function (resp) {
        console.log("Balance: ", resp.result)
        return resp
      }).catch(error => {
        console.log(error)
    });
    if(response.result.length != 0){
      this.currentAddress += 1;
      this.changeAddr += 1;
    } else {
      telLoop = false
    }
    console.log(this.currentAddress, this.changeAddr)
  }
    // return response.result
    this.checkUTxO()
}

     async getBalance(){
        let telnetAdapter = new TelnetAdapter()
        let bal = await telnetAdapter.telnetConstructor("blockchain.scripthash.get_balance", this.scripthash).then(function (resp) {
          console.log("Balance: ", resp.result)
          return resp
        }).catch(error => {
          console.log(error)
      });
      return bal.result
    }

    // sendAddr, sendAMT, changeAddress, privateKey
    async checkUTxO(sendAddr, sendAMT, changeAddress, privateKey, scripthash){
      let utxos = [];
      for(let i = 0; i < this.currentAddress; i++){
        let childNode = this.node.derive(i)
        let address = bitcoin.payments.p2pkh({ pubkey: childNode.publicKey, network }).address
        let telnetAdapt = new TelnetAdapter()
        let response = await telnetAdapt.telnetConstructor("blockchain.address.listunspent", address).then(function (resp) {
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
      this.changeAddr +=1
      let childNode = this.node.derive(this.changeAddr)
      let changeAddress = bitcoin.payments.p2pkh({ pubkey: childNode.publicKey, network }).address
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

  let btctx = new BTCTx("tpubDFe6R4ftoEmXJyTBufCo5gzZR41Xkuhegyqt2XQuc5WiZ27yJtq4V3T2nJr2yVNbU3jJmpYCiSiwH7k4QJkqNKqrA1crMQksucUcKQjTDF6")
  btctx.test()