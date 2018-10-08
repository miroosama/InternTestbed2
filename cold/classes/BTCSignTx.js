var bitcoin = require('bitcoinjs-lib');
const network = bitcoin.networks.testnet;
const fs = require('fs');
exports.BTCSignTx = (()=>{
    return class {
        constructor(transaction){
            this.transaction = transaction
        }
    
        async signTx(){
            let prv = fs.readFileSync('../InternTestbed2/cold/accounts/tpubDFe6R4ftoEmXJyTBufCo5gzZR41Xkuhegyqt2XQuc5WiZ27yJtq4V3T2nJr2yVNbU3jJmpYCiSiwH7k4QJkqNKqrA1crMQksucUcKQjTDF6.json', 'utf8')
             let privateKey = JSON.parse(prv)
            let keypairSpend = bitcoin.bip32.fromBase58(privateKey, network)
            this.transaction.sign(0, keypairSpend)
            let tx = this.transaction.build()
            let txhex = tx.toHex()
            let path = await USBAdapter.getPath().catch(err => {console.log(err)})
            fs.writeFileSync(`${path}/txhex.json`, JSON.stringify(txhex)) 
            console.log("TXHEX from Cold Class", txhex)
        }
    }
})();