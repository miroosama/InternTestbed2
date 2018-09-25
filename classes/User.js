const { BTCTx } = require('./BTCTx')
const { Wallet } = require('./BTCWallet')
const readline = require('readline');

exports.User = ( () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })

    return class {
        constructor(){
            this.mnemonic = ""
            this.firstAddress = "",
            this.privateKey = "",
            this.changeAddress = "",
            this.scripthash = ""
        }
    
        startSession(){
            rl.question("Sign in with mnemonic: ", (answer) =>{
                switch(answer){
                    default:
                        this.mnemonic = answer
                        this.createWallet(answer, "false")
                }
            })
        }
    
        createWallet(mnemonic, val){
            const wallet = new Wallet()
            wallet.createOrUpdateAccount(mnemonic, val)
            wallet.createOrUpdateAccount(mnemonic, "true")
            this.mnemonic = mnemonic
            this.firstAddress = wallet.address
            this.privateKey = wallet.privateKey
            this.changeAddress = wallet.changeAddr
            this.scripthash = wallet.scripthash
            console.log("SH", this.scripthash)
            this.sendOrCheck()
        }
    
        sendOrCheck(){
            rl.question("Check Balance or Send Transaction? ", (answer) => {
                switch (answer) {
                  case 'check balance':
                    this.checkBalance();
                    break;
                  case 'send transaction':
                    this.sendMoney();
                    break;
                default:
                console.log("cmon guy we aint got all day")
                }
            })
        }
    
        checkBalance(){
            const bitcoinCh = new BTCTx()
<<<<<<< HEAD
            bitcoinCh.getBalance(this.scripthash)
=======
            bitcoinCh.getBalance(this.firstAddress, this.mnemonic)
>>>>>>> 7c535d8fa5dca897be2043523112c9a0725e1ab8
            this.startSession()
        }
    
        sendMoney(){
            console.log("CHECKING ADDR", this.firstAddress)
            rl.question("Send bitcoin address: ", (answer) =>{
                rl.question("Send bitcoin amount: " , (answer2) =>{
                        this.sendTransaction(answer, answer2)
                })
            })
        }
    
        sendTransaction(sendAddr, sendAMT){
            const bitcoinTx = new BTCTx()
<<<<<<< HEAD
             bitcoinTx.checkUTxO(sendAddr, sendAMT, this.changeAddress, this.privateKey, this.scripthash)
=======
             bitcoinTx.checkUTxO(this.firstAddress, sendAddr, sendAMT, this.changeAddress, this.privateKey, this.scripthash)
>>>>>>> 7c535d8fa5dca897be2043523112c9a0725e1ab8
            // this.changeAddress = wallet.changeAddr
            // bitcoinTx.transactionBuilding(sendAddr, sendAMT, this.changeAddress, this.privateKey)  
            rl.close()
          }
    }
})();