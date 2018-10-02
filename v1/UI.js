const fs = require('fs');
const program = require('commander')

const rl = commander.createInterface({ 
    input: process.stdin,
    output: process.stdout
})


const User = (() => {
    return class{
        constructor() {
            this.mnemonic = "";
            this.account = JSON.parse(account)
        }
        
        startSession() {
            rl.prompt();
    //         if(this.account !== false){
    //             rl.question("which coin? (1) Bitcoin, (2) Ethereum", (answer) => {
    //                 switch(answer){
    //                 case '1 || Bitcoin || BTC':
    //                 this.bitcoin();
    //                 break;
    //               case '2 || Ethereum || ETH':
    //                 this.ethereum();
    //                 break;
    //             }
    //         })
    //     } else {
    //         rl.question("Sign in with mnemonic: ", (answer) =>{
    //             switch(answer){
    //                 default:
    //                 this.mnemonic = answer
    //                 this.createEtherWallet(answer)
    //             }
    //         })
    //     }
    // }
}

// {btc: {create: create(), import: import()}, ether: eth.create}
// rl "which coin?"
// for(loop through coins)
// answer == btc
// bitcoin



})();

let user = new User()
user.startSession()


