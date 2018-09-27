var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');

const {
  Wallet
} = require('../classes/BTCWallet');

let newWallet = new Wallet();
const str = "fun swamp jump history obvious scare struggle deputy cannon village buzz state power play expose moral million lift gravity size chalk grocery scout toss";
let val = "false";
let seed = bip39.mnemonicToSeed(str);
let root = newWallet.getRoot(seed);
let node = root.deriveHardened(44).deriveHardened(1).deriveHardened(0).derive(0).derive(0);
let prk = "cNVu4ia2waxd7qb6LNauU9haMG9bd5JCRCpferBN9Lq4uZgjLNch";
let network = bitcoin.networks.testnet;

test("Wallet is an object", () => {
  expect(typeof Wallet).toEqual("function")
});

test("when called Wallet instantiates a new wallet", () => {
  expect(typeof newWallet).toEqual("object")
});

test("createOrUpdateAccount returns a valid address", () => {
  expect(newWallet.createOrUpdateAccount(str, val)).toEqual("mgTaJF2s7x8QdLUN91YGFCg134UwG121io")
});

test("getNode derives an address", () => {
  expect(newWallet.getNode(root)).toEqual("mgTaJF2s7x8QdLUN91YGFCg134UwG121io")
});

test("getNewNode derives an address", () => {
  expect(newWallet.getNewNode(root)).toEqual("mgTaJF2s7x8QdLUN91YGFCg134UwG121io")
});

test("getAddress returns a valid address", () => {
  expect(newWallet.getAddress(node, network, prk)).toEqual("mgTaJF2s7x8QdLUN91YGFCg134UwG121io")
});

test("getChangeAddress returns a valid address", () => {
  expect(newWallet.getChangeAddress(node, network, prk)).toEqual("mgTaJF2s7x8QdLUN91YGFCg134UwG121io")
});