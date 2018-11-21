const Web3 = require('web3')
const fs = require('fs')
var { USBAdapter } = require('../../adapters/USBAdapter')
web3 = new Web3(new Web3.providers.HttpProvider("http://13.58.39.53:8545"))
web3 = new Web3(new Web3.providers.HttpProvider("http://13.58.39.53:8545"))


exports.ETHWallet = (() => {
    return class extends Web3 {

        constructor(mnemonic) {
            super();
            this.mnemonic = mnemonic
        }

       async createAccount() {
            let account = this.eth.accounts.create([this.mnemonic])
            console.log(account.address)
            let path = await USBAdapter.getPath().catch(err => {console.log(err)})
            fs.writeFileSync(`${path}/${account.address}.json`, JSON.stringify(account.address))
            fs.writeFileSync(`../InternTestbed2/cold/accounts/${account.address}.json`, JSON.stringify(account))
            console.log(account)
            return account
        }

    }
})();

