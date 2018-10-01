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
      })
    }

    async sendOrCheck() {
      await rl.question("Check Balance or Send Transaction? ", async (answer) => {
        switch (answer) {
          case 'check balance':
            await tx.getBalance(this.address);
            this.sendOrCheck();
            break;
          case 'send transaction':
            await this.sendMoney();
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

    async sendMoney() {
      // console.log("CHECKING ADDR", this.firstAddress)
      await rl.question("Enter the recipient's address: ", async (answer) => {
        await rl.question("Enter the amount: ", async (answer2) => {
          await tx.makeTx(this.address, answer, answer2, Buffer.from(`${this.prk}`, 'hex'));
          setTimeout(() => {
            console.log('\n')
            this.sendOrCheck()
          }, 3000)
        })
      })
    }

  }
})()