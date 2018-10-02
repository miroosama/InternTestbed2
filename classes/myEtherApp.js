const EtherTransaction = require('./myEtherTx')
const Wallet = require('./myEther')
const readline = require('readline');
const Web3 = require('web3')
var Tx = require('ethereumjs-tx')
var fs = require('fs')
// const infura = 'https://ropsten.infura.io/v3/e7e240cdeda947cdbaf41a2092c85ff5'
// const web3 = new Web3(Web3.givenProvider || infura)
web3 = new Web3(new Web3.providers.HttpProvider("http://13.58.39.53:8545"))


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })


class User {
    constructor(account = false){
        this.mnemonic = "",
        this.account = JSON.parse(account)
    }


    startSession(){
        if(this.account !== false){
            rl.question("check balance or send transaction: ", (answer) =>{
                switch(answer){
                    case 'check balance':
                    this.checkBalance();
                    break;
                  case 'send transaction':
                    this.sendMoney();
                    break;
                }
            })
        } else {
        rl.question("Sign in with mnemonic: ", (answer) =>{
            switch(answer){
                default:
                    this.mnemonic = answer
                    this.createEtherWallet(answer)
            }
        })
      }
    }

    createEtherWallet(){
        let wallet = new Wallet()
        let newAccount = wallet.createAccount(this.mnemonic)
        this.account = newAccount
        this.startSession()
    }

    async checkBalance(){
        // let account = web3.eth.accounts.privateKeyToAccount(this.account.privateKey)
        let tx = new EtherTransaction(this.account)
        await tx.displayBalance()
        this.startSession()
    }

    sendMoney(){
        let tx = new EtherTransaction(this.account)
        rl.question("Send ether address: ", (answer) => {
            rl.question("Send ether amount: ", (answer2) => {
                let tx = new EtherTransaction(this.account)
                tx.buildingTx(answer, answer2)
            })
        })
    }
        
}


module.exports = User;

let account = fs.readFileSync('../accounts.json', 'utf8')

let user = new User(account)

user.startSession()






// curl --data '{\"method\":\"web3_clientVersion\",\"params\":[],\"id\": 1,\"jsonrpc\":\"1.0\"}' -H "Content-Type: application/json" -X POST 13.58.39.53:8545







// const wallet = new Wallet()
// wallet.createAccount("vitalik is a great guy")
// console.log("HIAHHAD", wallet.account.privateKey)


// wallet.displayBalance("0xaa98f82ab403663748e10b6f7256e3c29cdd0051")

//  const etherTx = new EtherTransaction()

// etherTx.buildingTx(wallet.account.address, sendaddr, wallet.account.privateKey)



// etherTx.buildingTx("0xaa98f82ab403663748e10b6f7256e3c29cdd0051", '0x55238836654bd72Fce6E2a0E20118ec25FF3a333', "516690b19c04eeb1c9894ab18b56bfeb291eaaa0574c8bc92096cf3c592d1ff9", "0.1")
// transaction completed and gave the following txhash:
// txhash: 0x0a94540dabba198f3b3114db7b77b05fabcf10f7ff96d6dbca9928cf0f06333b
//txhash: 0x0a94540dabba198f3b3114db7b77b05fabcf10f7ff96d6dbca9928cf0f06333b

//etherTx.buildingTx("0xaa98f82ab403663748e10b6f7256e3c29cdd0051", '0xa51DBF829a695aE1721040752fE80434D8e35E4b', "516690b19c04eeb1c9894ab18b56bfeb291eaaa0574c8bc92096cf3c592d1ff9" )
// transaction completed and gave the following txhash:
//txhash: 0x65daf45b344639fc88bb8f5fc542f123bac6bb87360388ac9cc0432fb05b7408

// { address: '0x55238836654bd72Fce6E2a0E20118ec25FF3a333',
//   privateKey:
//    '0x2369de35dcfbd8a58f46a5c1ab1972c1c2b5f3401b9faebde3b6a3809356d555',











// { address: '0xa51DBF829a695aE1721040752fE80434D8e35E4b',
//   privateKey:
//    '0x93621d25ecda51cb464fb849c6ea0972ded82e6b6ebb76097d1fc4bab5c3d601',

//tx hash from metamask faucet
// 0xc5e119a51711434a5b5ec04c6ad39ced75a6fb49f1d79db97c0e2530c5ac426e

// 0x81b7e08f65bdf5648606c89998a9cc8164397647

// To:  0xaa98f82ab403663748e10b6f7256e3c29cdd0051











// {btc: {create: create(), import: import()}, ether: eth.create}

// rl "which coin?"
// for(loop through coins)
// answer == btc

// bitcoin