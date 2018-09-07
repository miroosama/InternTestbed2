const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');
const funcs = require('./bitcoin_gray.js');

// HDNode was deprecated: https://github.com/bitcoinjs/bitcoinjs-lib/issues/1206
// and https://github.com/bitcoinjs/bitcoinjs-lib/issues/1047

const network = bitcoin.networks.testnet; // bitcoin.networks.bitcoin for mainnet
const mnemonic = "quality chaos left cabbage aware sponsor shop burger urge lottery face glimpse";
const seed = bip39.mnemonicToSeed(mnemonic);
const root = bitcoin.bip32.fromSeed(seed, network);
const Tree = bitcoin.bip32.fromSeed(seed, network);
const Leaf = Tree.deriveHardened(44).deriveHardened(1).deriveHardened(0).derive(0).derive(0);
const Leaf2 = Tree.deriveHardened(44).deriveHardened(1).deriveHardened(0);
// let txb = new bitcoin.TransactionBuilder()

// async function checkBalanceHandler(){
//     let data = await funcs.checkBalance(funcs.getAddress(Leaf, network))
//     console.log(data)
// }
// checkBalanceHandler()

funcs(funcs.createTX(200, 2000, `cRyUBkZgD44iSxw844fAB2RnfnW3H7XencuEwbuUk1iXJ2Xw2sT6`, `966aa228397a9968894165d9adad2ced2d9492a178e6cd76401518dc2bfc5a5d`, `msTeEpLKa4dKbFj5WUQ962Tu7bWyQjM6wS`, `mgZ8bRtxoMaRKaemwbv99EooWZdt2CMy8u`, 0))