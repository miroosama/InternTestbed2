const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question("say something: ", (answer) => {
  switch (answer) {
    case 'hello':
      saySomething('hey');
      break;
    case 'goodbye':
      saySomething('bye');
      break;
    default:
      saySomething('something')
  }
  rl.close();
})

function saySomething(something) {
  console.log(something)
}