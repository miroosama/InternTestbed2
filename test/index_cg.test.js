var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');
const request = require('request');

const {
  Wallet
} = require("../classes/index_cg")

let newWallet = new Wallet();

test("Wallet is an object", () => {
  expect(typeof Wallet).toEqual("function")
});

test("when called Wallet instantiates a new wallet", () => {
  expect(typeof newWallet).toEqual("object")
});

test("generateMnemonic generates a new mnemonic", () => {
  expect(typeof newWallet.generateMnemonic()).toEqual("string")
});

test("generateSeed generates a valid seed", () => {
  let mnemonic = newWallet.generateMnemonic();
  expect(newWallet.generateSeed(mnemonic).length).toEqual(64)
});

test("always the same seed is generated from the same mnemonic", () => {
  const mnemonic = "medal meat stay crisp aerobic parent grit absurd steel flip minimum search";
  expect(JSON.stringify(newWallet.generateSeed(mnemonic))).toBe('{"type":"Buffer","data":[118,254,239,47,219,224,91,242,130,37,2,214,87,229,97,102,217,178,178,229,225,125,46,139,75,176,177,98,129,241,192,220,219,194,138,136,70,135,155,67,245,178,106,172,111,125,184,211,122,198,104,179,211,216,217,3,119,170,31,1,76,35,189,35]}')
});

test("deriveAddresses generates an array of 3 addresses", () => {
  let mnemonic = newWallet.generateMnemonic();
  let seed = newWallet.generateSeed(mnemonic);
  expect(newWallet.deriveAddresses(seed).length).toEqual(3)
});