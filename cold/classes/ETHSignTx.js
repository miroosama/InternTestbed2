const Web3 = require('web3')
var Tx = require('ethereumjs-tx')
var fs = require('fs')

exports.ETHSignTx = (() => {
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
            //let prk = fs.readFileSync()
            // let prk = this.account.privateKey.slice(2)
            const privateK = Buffer.from(prk, 'hex')
            this.transaction.sign(privateK)
            const serializedTransaction = this.transaction.serialize() 
            const txhex = '0x' + serializedTransaction.toString('hex')
            let path = await USBAdapter.getPath().catch(err => {console.log(err)})
            fs.writeFileSync(`${path}`, JSON.stringify(txhex))
        }
    }
})();