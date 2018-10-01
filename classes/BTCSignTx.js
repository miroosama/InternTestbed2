var bitcoin = require('bitcoinjs-lib');
const network = bitcoin.networks.testnet;

class Sign {
    constructor(transaction){
        this.transaction = transaction
    }

    signTx(){
        let keypairSpend = bitcoin.bip32.fromBase58("tprv8ix4Gedees5rRWRQ21YCgHLSr2VbbaWk7gF6k1NcBoiKiXsCgW1UJYqAcBj4S9BxPXoC6ZNWkJeD1z35awxAwNHKPLnckSh8e1PfbpLQGFF", network)
        this.transaction.sign(0, keypairSpend)
        let tx = this.transaction.build()
        let txhex = tx.toHex()
        console.log("TXHEX from Cold Class", txhex)
    }
}

module.exports = Sign;