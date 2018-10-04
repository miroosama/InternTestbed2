const Web3 = require('web3')
var Tx = require('ethereumjs-tx')
var fs = require('fs')

exports.ETHSignTx = (() => {
    return class {
        constructor(transaction){
            this.transaction = transaction
        }

        signTx(){
            let prk = fs.readFileSync()
            // let prk = this.account.privateKey.slice(2)
            const privateK = Buffer.from(prk, 'hex')
            this.transaction.sign(privateK)
            const serializedTransaction = this.transaction.serialize() 
            const raw = '0x' + serializedTransaction.toString('hex')
            fs.writeFileSync()
        }
    }
})();