const Web3 = require('web3')
const Tx = require('ethereumjs-tx')
const web3 = new Web3("https://testnet-rpc.thundercore.com:8544")

class ThunderTx {

        constructor(account){
            this.account = account
        }
    
        buildingTx(sendAcc, amount) {
            web3.eth.getTransactionCount(this.account.address, (err, txCount) => { 
                const txObject = {
                    nonce: web3.utils.toHex(txCount),
                    to: sendAcc, // passed in receiving account address
                    value: web3.utils.toHex(web3.utils.toWei(amount, 'ether')),
                    gasLimit: web3.utils.toHex(21000),
                    gasPrice: web3.utils.toHex(web3.utils.toWei('41', 'gwei'))
                }
                const tx = new Tx(txObject) 
                 // export transaction object for signing
            })
        }
    
        broadcastTx(txSigned){
            // pass in or import signed transaction 
            web3.eth.sendSignedTransaction(txSigned, (err, txHash) => {
                console.log('txhash:', txHash)
            })
        }
       
}

module.exports = { ThunderTx }