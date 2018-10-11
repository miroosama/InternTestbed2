const rippleKeyPairs = require('ripple-keypairs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// rl.question("Enter a secret: ", (answer1) => {
//   rl.question("address or keypair? ", (answer2) => {
//     switch (answer2) {
//       case 'keypair':
//         deriveKeypair(answer1);
//         break;
//       case 'address':
//         deriveAddress(answer1);
//         break;
//       default:
//         console.log('pelase enter a secret and a question')
//     }
//     rl.close()
//   })
// })

rl.question("Enter a secret: ", (answer1) => {
  select(answer1);
})


function select(answer1) {
  rl.question("address or keypair? ", (answer2) => {
    switch (answer2) {
      case 'keypair':
        deriveKeypair(answer1);
        select(answer1);
        break;
      case 'address':
        deriveAddress(answer1);
        select(answer1);
        break;
      case 'exit':
        rl.close();
        break;
      default:
        console.log('pelase enter a secret and a question');
        select(answer1);
        break;
    }
    // rl.close()
  })
}

function deriveKeypair(secret) {
  const keypair = rippleKeyPairs.deriveKeypair(secret)
  console.log(keypair)
  return keypair;
}

function deriveAddress(secret) {
  const keypair = rippleKeyPairs.deriveKeypair(secret);
  const address = rippleKeyPairs.deriveAddress(keypair.publicKey);
  console.log(address);
  return address;
}