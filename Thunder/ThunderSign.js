

class SignThunder {
    constructor(transaction){
        this.transaction = transaction
    }

    signTx(){

        // prk = import private key from cold 
        const privateKey = Buffer.from(prk, 'hex')
        this.transaction.sign(privateKey)
        const serializedTransaction = this.transaction.serialize() 
        const txhex = '0x' + serializedTransaction.toString('hex')
        return txhex
    }

}

module.exports = { SignThunder }