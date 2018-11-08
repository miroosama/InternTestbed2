const Base58 = require('base58');
const bip39 = require("bip39");
const base58check = require('base58check');


function check(value) {
  try {
    typeof Base58.decode(value) === 'number';
    console.log("this is valid");
    return true;
  } catch (err) {
    console.log(err.message)
    return err.message;
  }
}

// check('ssppaW1yBy4AUJ8BLHApEoaJNqHoS');

const passphrase = 'masterphrase';
let sha512 = 'DEDCE9CE67B451D852FD4E846FCDE31C4E48EB676DEE37FDC4832DF2167B62D23AD9738E59DE8EBA5C1190BDC264C5BB19DA7E1F9CCE362F6314477C2594104A'
var seed = sha512.slice(0, 32)
const hex = seed.toString('hex')
// base58 = Base58.encode(seed)
console.log(base58check.encode(seed))
console.log(base58check.decode('1475jYR1zTToXjR9Hz1SxboJmJ2go', 'hex'))

// const passphrase = 'masterphrase';
// var seed = bip39.mnemonicToSeed(passphrase);
// const hex = seed.toString('hex')
// const base58 = Base58.encode(hex)
// console.log(base58)