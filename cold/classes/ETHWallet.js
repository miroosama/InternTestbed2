const Web3 = require('web3')
const fs = require('fs')
web3 = new Web3(new Web3.providers.HttpProvider("http://13.58.39.53:8545"))

exports.ETHWallet = (() => {
    return class extends Web3 {

        constructor(mnemonic) {
            super();
            this.mnemonic = mnemonic
        }

        createAccount() {
            let account = this.eth.accounts.create([this.mnemonic])
            var data = fs.writeFileSync(`./accounts.json`, JSON.stringify(account))
            console.log(account)
            return account
        }

    }
})();