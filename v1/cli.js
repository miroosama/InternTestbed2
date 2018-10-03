#!/usr/bin/env node

const fs = require('fs');
const program = require('commander');
const args = require('minimist')(process.argv.slice(2))._;
const EtherWallet = require('../classes/myEther')
const BitcoinWallet = require('../classes/BTCWallet')
const BTCTx = require('../classes/BTCTx')


let create = {
  btc: BitcoinWallet,
  eth: EtherWallet
}

let send = {

}


class User {
    constructor(args) {
      this.args = args;
    }

    path() {
      switch (this.args[0]) {
        case 'create':
        for(var coin in create){
          new create[coin](this.args[1]).createAccount()
        }
          break;
        case 'import':
        this.importFile();
        break;
        default:
          console.log('please enter a command');
      }
    }

      importFile() {
        let account = fs.readFileSync('./classes/accounts/tpubDFe6R4ftoEmXJyTBufCo5gzZR41Xkuhegyqt2XQuc5WiZ27yJtq4V3T2nJr2yVNbU3jJmpYCiSiwH7k4QJkqNKqrA1crMQksucUcKQjTDF6.json', 'utf8')
        let transaction = new BTCTx(account);
        transaction.getBalance()
        
      }

      // if(!this.args[0]) {
      //   console.log("please enter your arguments")
      // }
      // else {
      //   console.log(this.args)
      // }

  }

  let user = new User(args);
  user.path();

// console.log("script is connected")

function log(input) {
  console.log(`it ${input}`)
}

// if(!process.argv[2] || !process.argv[3] || !process.argv[4] ) {
//   console.log("please input an argument")
// }

// let listFunction = (directory, options) => {
//     console.log("works")
//   }

// program
//   .version('0.0.1')
//   .command('--help')
//   .description('lists all available commands')
//   .option('methods', 'list all methods')
//   .action(listFunction);
  
//   program.parse(process.argv);



// // const program = require('commander');

// // const rl = commander.createInterface({ 
// //     input: process.stdin,
// //     output: process.stdout
// // })


// const User = (() => {
//     return class{
//         constructor() {
//             this.mnemonic = "";
//             this.account = JSON.parse(account)
//         }
        
//         startSession() {
// }

//     //         if(this.account !== false){
//     //             rl.question("which coin? (1) Bitcoin, (2) Ethereum", (answer) => {
//     //                 switch(answer){
//     //                 case '1 || Bitcoin || BTC':
//     //                 this.bitcoin();
//     //                 break;
//     //               case '2 || Ethereum || ETH':
//     //                 this.ethereum();
//     //                 break;
//     //             }
//     //         })
//     //     } else {
//     //         rl.question("Sign in with mnemonic: ", (answer) =>{
//     //             switch(answer){
//     //                 default:
//     //                 this.mnemonic = answer
//     //                 this.createEtherWallet(answer)
//     //             }
//     //         })
//     //     }
//     // }


// // {btc: {create: create(), import: import()}, ether: eth.create}
// // rl "which coin?"
// // for(loop through coins)
// // answer == btc
// // bitcoin



// })();

// let user = new User()
// user.startSession()


