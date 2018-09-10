const readline = require('readline');

const rl = readline.createInterface({
<<<<<<< HEAD
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
=======
    input: process.stdin,
    output: process.stdout
})

rl.question("say something: ", (answer) =>{
    switch(answer){
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

function saySomething(something){
    console.log(something)
>>>>>>> ff153d23f48a42d0b7fcca2247bf42b043707046
}