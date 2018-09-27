const {
    BTCTx
} = require('./BTCTx')
const {
    Wallet
} = require('./BTCWallet')
const readline = require('readline');

exports.User = (() => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    return class {
        constructor() {
            this.mnemonic = ""
            this.firstAddress = "",
                this.privateKey = "",
                this.changeAddress = "",
                this.scripthash = ""
        }

        startSession() {
            rl.question("Sign in with mnemonic: ", (answer) => {
                switch (answer) {
                    default:
                        this.mnemonic = answer
                        this.createWallet(answer, "false")
                }
            })
        }

        createWallet(mnemonic, val) {
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
            return [this.firstAddress, this.changeAddress];
        }

        sendOrCheck() {
            rl.question("Check Balance or Send Transaction? ", (answer) => {
                switch (answer) {
<<<<<<< HEAD
                  case 'check balance':
                    this.checkBalance();
                    break;
                  case 'send transaction':
                    this.sendMoney();
                    break;
                default:
                console.log("try again: invalid input")
                this.sendOrCheck()
                }
            })
        }
    
        async checkBalance(){
            const bitcoinCh = new BTCTx()
            await bitcoinCh.getBalance(this.firstAddress, this.scripthash)
            this.sendOrCheck()
=======
                    case 'check balance':
                        this.checkBalance();
                        break;
                    case 'send transaction':
                        this.sendMoney();
                        break;
                    default:
                        console.log("try again: invalid input")
                        this.sendOrCheck()
                }
            })
        }

        checkBalance() {
            const bitcoinCh = new BTCTx()
            bitcoinCh.getBalance(this.scripthash)
            this.startSession()
            return bitcoinCh.getBalance(this.scripthash)
>>>>>>> 8ee04cad239e0158f92470fbf94658627c796717
        }

        sendMoney() {
            console.log("CHECKING ADDR", this.firstAddress)
            rl.question("Send bitcoin address: ", (answer) => {
                rl.question("Send bitcoin amount: ", (answer2) => {
                    this.sendTransaction(answer, answer2)
                })
            })
        }

        sendTransaction(sendAddr, sendAMT) {
            const bitcoinTx = new BTCTx()
            bitcoinTx.checkUTxO(sendAddr, sendAMT, this.changeAddress, this.privateKey, this.scripthash)
            // this.changeAddress = wallet.changeAddr
            // bitcoinTx.transactionBuilding(sendAddr, sendAMT, this.changeAddress, this.privateKey)  
            rl.close()
        }
    }
})();

// {"id": "1", "method": "blockchain.address.get_balance", "params": ["n1s4prKnN1MYALQLYYYQRWxGHkrxL2JFyN"], "jsonrpc" : "1.0"}