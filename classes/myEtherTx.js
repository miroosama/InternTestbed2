
const Web3 = require('web3')
var Tx = require('ethereumjs-tx')
// const infura = 'https://ropsten.infura.io/v3/e7e240cdeda947cdbaf41a2092c85ff5'
// const web3 = new Web3(Web3.givenProvider || infura)

web3 = new Web3(new Web3.providers.HttpProvider("http://13.58.39.53:8545"))

class EtherTransactions {
    constructor(account){
        this.account = account
    }

    getBalance(){
        console.log(this.account)
        web3.eth.getBalance(this.account.address)
            .then((res) => console.log(web3.utils.fromWei(res, 'ether')))
        }

    buildingTx(soundAcc, amount) {
     web3.eth.getTransactionCount(this.account.address, (err, txCount) => { 
        const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: soundAcc,
            value: web3.utils.toHex(web3.utils.toWei(amount, 'ether')),
            gasLimit: web3.utils.toHex(21000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('41', 'gwei'))
        }
        const tx = new Tx(txObject) 

        let txSigned = this.signTx(tx)

        web3.eth.sendSignedTransaction(txSigned, (err, txHash) => {
            console.log('txhash:', txHash)
        })
    })
 }

    signTx(tx){
        let prk = this.account.privateKey.slice(2)
        const privateK = Buffer.from(prk, 'hex')
        tx.sign(privateK)
        //prompt to confirm
        const serializedTransaction = tx.serialize() 
        const raw = '0x' + serializedTransaction.toString('hex')
        return raw
    }

}

module.exports = EtherTransactions;