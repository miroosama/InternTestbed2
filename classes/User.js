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
        startSession() {
            rl.question("Sign in with mnemonic: ", (answer) => {
                switch (answer) {
                    default:
                        this.createWallet(answer)
                }
            })
        }

        createWallet(mnemonic) {
            const wallet = new Wallet(mnmonic)
            wallet.createOrUpdateAccount(mnemonic);
        }

        sendOrCheck() {
            rl.question("Check Balance or Send Transaction? ", (answer) => {
                switch (answer) {
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
        }

        sendMoney() {
            console.log("CHECKING ADDR", this.firstAddress)
            rl.question("Send bitcoin address: ", (answer) => {
                rl.question("Send bitcoin amount: ", (answer2) => {
                    const bitcoinTxBuild = new BTCTx()
                    bitcoinTxBuild.checkUtxO(answer, answer2)
                })
            })
        }

        sendTransaction(txhex) {
            const bitcoinTx = new BTCTx()
            bitcoinTx.broadcastTx(txhex)
            rl.close()
        }
    }
})();

// {"id": "1", "method": "blockchain.address.get_balance", "params": ["n1s4prKnN1MYALQLYYYQRWxGHkrxL2JFyN"], "jsonrpc" : "1.0"}