const readline = require('readline');

const {
  web3Tx
} = require('./web3Tx_ie');

const tx = new web3Tx;

exports.User = (() => {

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return class {
    constructor() {
      this.address = "";
      this.prk = "";
    }

    startSession() {
      rl.question("Enter your account: ", (answer) => {
        rl.question("Enter you private key: ", (answer1) => {
          this.address = answer;
          this.prk = answer1;
          this.sendOrCheck()
        })
        // switch (answer) {
        //   default:
        //     this.account = answer
        // }
      })
    }

    sendOrCheck() {
      rl.question("Check Balance or Send Transaction? ", (answer) => {
        switch (answer) {
          case 'check balance':
            tx.getBalance(this.address);
            this.sendOrCheck();
            break;
          case 'send transaction':
            this.sendMoney();
            break;
          case 'exit':
            rl.close();
            break;
          default:
            console.log("try again: invalid input")
            this.sendOrCheck()
        }
      })
    }

    sendMoney() {
      // console.log("CHECKING ADDR", this.firstAddress)
      rl.question("Enter the recipient's address: ", (answer) => {
        rl.question("Enter the amount: ", (answer2) => {
          tx.makeTx(this.address, answer, answer2, Buffer.from(`${this.prk}`, 'hex'));
          this.sendOrCheck()
        })
      })
    }

  }
})()

// module.exports = {
//   User
// }