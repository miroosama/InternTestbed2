const BitcoinTransaction = require('./BTCTx')
const Wallet = require('./BTCWallet')
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })


class User {
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
        const bitcoinCh = new BitcoinTransaction()
         bitcoinCh.getBalance(this.firstAddress, this.mnemonic)
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
        const bitcoinTx = new BitcoinTransaction()
         bitcoinTx.checkUTxO(this.firstAddress, sendAddr, sendAMT, this.changeAddress, this.privateKey, this.scripthash)
        // this.changeAddress = wallet.changeAddr
        // bitcoinTx.transactionBuilding(sendAddr, sendAMT, this.changeAddress, this.privateKey)  
        rl.close()
      }
}
module.exports = User;




// n1h4g9FkQe2N68uY5cwQFHcweGhGqSK78v



// wallet.createOrUpdateAccount("column capable stage auto obey twist bring correct crunch act penalty seminar goddess cage inflict pig route fence example cannon fragile puppy actual hedgehog", "true")



// "{\"id\":\"myquery\",\"method\":\"getaddressbalance\",\"params\":[\"14vuRY354EaxDu4WrgjtvoDEwntDNwMVbx\"]}

// "{\"jsonrpc\":\"1.0\",\"id\":\"interns\",\"method\":\"getbalance\",\"params\": [\"\"]   }" 18.222.107.97:50001

// curl --user btcuser:btcpassword --data-binary "{\"jsonrpc\":\"1.0\",\"id\":\"interns\",\"method\":\"blockchain.transaction.get\",\"params\":[\"\"]}" 18.191.234.50:50001

// electrumx_rpc env DB_DIRECTORY=/data/db/ RPC_HOST=0.0.0.0 HOST= TCP_PORT=50001 DAEMON_URL=http://btcuser:btcpassword@127.0.0.1:18332 COIN=BitcoinSegwit NET=testnet /usr/local/bin/electrumx_server.py > ~/electrumx_server.log 2>&1 &


//curl --user btcuser:btcpassword --data-binary {"jsonrpc": "1.0", "id": "interns", "method":"blockchain.transaction.get","params":["fc992bd10bbcbd54ee2279de497ad4bd49ce6a64c27f2a2d3293f761d2a5a3a3"]}
