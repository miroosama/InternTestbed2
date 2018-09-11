
const Web3 = require('web3')
var Tx = require('ethereumjs-tx')
const infura = 'https://ropsten.infura.io/v3/e7e240cdeda947cdbaf41a2092c85ff5'
const web3 = new Web3(Web3.givenProvider || infura)

class EtherTransactions {

    buildingTx(acc1, acc2, prk) {
    web3.eth.getTransactionCount(acc1, (err, txCount) => {
        const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: acc2,
            value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),
            gasLimit: web3.utils.toHex(21000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
        }

        const tx = new Tx(txObject) 
        tx.sign(prk)

        const serializedTransaction = tx.serialize() 
        const raw = '0x' + serializedTransaction.toString('hex')

        web3.eth.sendSignedTransaction(raw, (err, txHash) => {
            console.log('txhash:', txHash)
        })

    })
    }

}

module.exports = EtherTransactions;