const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');
const {awaitLog, promiseLog, checkBalance, getAddress} = require('./bitcoin_gray.js');

// HDNode was deprecated: https://github.com/bitcoinjs/bitcoinjs-lib/issues/1206
// and https://github.com/bitcoinjs/bitcoinjs-lib/issues/1047

const network = bitcoin.networks.testnet; // bitcoin.networks.bitcoin for mainnet
const mnemonic = "quality chaos left cabbage aware sponsor shop burger urge lottery face glimpse";
const seed = bip39.mnemonicToSeed(mnemonic);
const Tree = bitcoin.bip32.fromSeed(seed, network);
const Leaf = Tree.deriveHardened(44).deriveHardened(1).deriveHardened(0).derive(0).derive(0);
const Leaf2 = Tree.deriveHardened(44).deriveHardened(1).deriveHardened(0);
// let txb = new bitcoin.TransactionBuilder()

awaitLog(checkBalance(getAddress(Leaf, network)))


// console.log(funcs.checkBalance(funcs.getAddress(Leaf, network)))
// console.log(
//     funcs.createTX(200, 92000, `cSbU6VWqTPzocKmHq4Jgjzt8pnTdDXU4hQwrWceRjQCYUqnX1kiF`, `228970aa74900d1301abbc65e077db75dedcb348875cecab80de48b2a682749f`, `miLrxoayoWzX4fJ5WD8QVzmMrCUwbJBisS`, `mgHexm9UkuJipmka4zjSHJBXMRNAi3Werq`, 1)
// )