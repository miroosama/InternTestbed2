
const Web3 = require('web3')
var Tx = require('ethereumjs-tx')
const infura = 'https://ropsten.infura.io/v3/e7e240cdeda947cdbaf41a2092c85ff5'
const web3 = new Web3(Web3.givenProvider || infura)

class Wallet extends Web3 {
    constructor(){
        super();
        this.account = ""
    }

    createAccount(str){
    let acc = this.eth.accounts.create([str])
    this.account = acc
    let addr = acc.address
    // this.displayBalance(addr)
    console.log(acc)
    return acc.address
    }

    displayBalance(addr){
    web3.eth.getBalance(addr)
        .then((res) => console.log(web3.utils.fromWei(res, 'ether')))
    }

}


module.exports = Wallet;







