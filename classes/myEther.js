
const Web3 = require('web3')
var Tx = require('ethereumjs-tx')
// const infura = 'https://ropsten.infura.io/v3/e7e240cdeda947cdbaf41a2092c85ff5'
// const web3 = new Web3(Web3.givenProvider || infura)

var fs = require('fs')

web3 = new Web3(new Web3.providers.HttpProvider("http://13.58.39.53:8545"))


class Wallet extends Web3 {


    createAccount(mnemonic){
    let account = this.eth.accounts.create([mnemonic])
    var data = fs.writeFileSync(`../accounts.json`, JSON.stringify(account), (err) => {  
        // throws an error, you could also catch it here
        if (err) throw err;
    
    }  )
    console.log(account)
    return account
    }

}


module.exports = Wallet;







