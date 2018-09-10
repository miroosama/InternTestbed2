const readline = require('readline');

const run_bitcoin = require("./bitcoin_ie");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question("Enter a function: ", (answer) => {
  switch (answer) {
    case 'balance':
      saySomething(console.log(run_bitcoin.balance));
      break;
    case 'public':
      saySomething(console.log(run_bitcoin.public));
      break;
    case 'private':
      saySomething(console.log(run_bitcoin.private));
      break;
    case 'address':
      saySomething(console.log(run_bitcoin.address));
      break;
    case 'tx':
      saySomething(console.log(run_bitcoin.tx));
      break;
    case 'push':
      saySomething(console.log(run_bitcoin.push));
      break;
    default:
      saySomething('pelase enter a valid function')
  }
  rl.close();
})

function saySomething(something) {
  console.log(something)
}