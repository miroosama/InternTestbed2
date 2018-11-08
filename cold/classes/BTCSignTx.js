var bitcoin = require('bitcoinjs-lib');
const network = bitcoin.networks.testnet;
const fs = require('fs');
exports.BTCSignTx = (()=>{
    return class {
        constructor(transaction){
            this.transaction = transaction
        }
    
        async signTx(){
            /** This signing method must be refactored to dynamically grab privKeys 
             *  based on the TXhash file passed in on the flash drives. Our model still
             *  relies on the string matching whereby the raw transaction hex is named the
             *  TPUB of the coin/account it is drawing from. Without this functionality our
             *  app doesn't work. instead of exporting a txhex.json file that overwrites 
             *  each export, instead we will maintain a folder called TXHex, the contents of 
             *  which will be deleted every time a new TXHex is written to it. This
             *  way we can retain our pubKey naming convention while not concerning ourselves
             *  with any other data exported with that name onto the usb drive (which will be
             *  refactored out of our application when we add the account JSON export fucntionality)
             */
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