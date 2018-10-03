var bitcoin = require('bitcoinjs-lib');
const network = bitcoin.networks.testnet;

class Sign {
    constructor(transaction){
        this.transaction = transaction
    }

    signTx(){
        let prv = fs.readFileSync fs.readFileSync('./classes/accounts/privateK.json', 'utf8')
        // let privateKey = JSON.parse(prv)
        let keypairSpend = bitcoin.bip32.fromBase58(prv, network)
        this.transaction.sign(0, keypairSpend)
        let tx = this.transaction.build()
        let txhex = tx.toHex()
        fs.writeFileSync(`./classes/accounts/signedTx.json`, JSON.stringify(txhex)) 
        console.log("TXHEX from Cold Class", txhex)
    }
}

module.exports = Sign;