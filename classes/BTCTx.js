var bitcoin = require('bitcoinjs-lib');
const axios = require('axios')
const network = bitcoin.networks.testnet;
const coinSelect = require('./coinselect/coinSelect.js')
const { RPCAdapter } = require('../classes/classbin/RPCAdapter');
const { TelnetAdapter } = require('./TelnetAdapter.js')

class BTCTx {
    constructor(accountExtendedPublicKey){
        this.pub = accountExtendedPublicKey,
        this.node = bitcoin.bip32.fromBase58(accountExtendedPublicKey, network),
        this.scripthash = "",
        this.utxos= "",
        this.txhex = "",
        this.inputs = "",
        this.outputs = ""
    }

    test(){
      // console.log(bitcoin)
      // bitcoin.bip32.fromBase58(accountExtendedPublicKey, network).derive(0)
      console.log(this.node)
      console.log(bitcoin.payments.p2pkh({ pubkey: this.node.publicKey, network }).address)
      let address = bitcoin.payments.p2pkh({ pubkey: this.node.publicKey, network }).address
      let script = bitcoin.address.toOutputScript(address, network)
      let hash = bitcoin.crypto.sha256(Buffer.from(script))
      let reversedHash = hash.reverse()
      this.scripthash = reversedHash.toString('hex')
      this.getBalance()
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
        
    //   let telnetAdaptor = new TelnetAdapter()
    //   let response = await telnetAdaptor.telnetConstructor("blockchain.transaction.broadcast", this.txhex).then(function (resp) {
    //     console.log(resp)
    //     return resp
    //   }).catch(error => {
    //     console.log(error)
    // });
    }
  }

  let btctx = new BTCTx("tpubDFe6R4ftoEmXJyTBufCo5gzZR41Xkuhegyqt2XQuc5WiZ27yJtq4V3T2nJr2yVNbU3jJmpYCiSiwH7k4QJkqNKqrA1crMQksucUcKQjTDF6")
  btctx.test()