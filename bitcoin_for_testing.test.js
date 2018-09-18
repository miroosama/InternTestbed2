var bitcoin = require('bitcoinjs-lib');
var bip39 = require('bip39');

let network = bitcoin.networks.testnet;
let mnemonic = "maple give attract network afraid clog rocket mirror increase outdoor curious suffer bamboo matter ramp";
let seed = bip39.mnemonicToSeed(mnemonic);
let Tree = bitcoin.bip32.fromSeed(seed, network);
let Leaf = Tree.deriveHardened(44).deriveHardened(1).deriveHardened(0).derive(0).derive(0);

const {
  getAddress,
  getPublicKey,
  getPrivateKey,
  mnemonic12,
  mnemonic24
} = require("./bitcoin_for_testing")

test("getAddress return a valid address", () => {
  expect(getAddress(Leaf, network)).toEqual("mneSrzhURsCs3JYdxakDdcBqbF9y1XCEZq");
  expect(getPrivateKey(Leaf)).toEqual("cN66Qp23DXb2x9s7aXs7So31z9ZBHW8NZcvUjBHfmGWZsxtqnRia");
});

test("getPublicKey returns a valid public key", () => {
  expect(getPublicKey(Leaf)).toEqual("033a0c966b25db0ed8a63383e72f9cc076b4a9fb671730b3bbf8f0c82f36c677aa");
});

test("getPrivateKey returns a valid private key", () => {
  expect(getPrivateKey(Leaf)).toEqual("cN66Qp23DXb2x9s7aXs7So31z9ZBHW8NZcvUjBHfmGWZsxtqnRia");
});

test("a 12 word mnemonic is generated properly", () => {
  expect(mnemonic12().split(' ').length).toEqual(12);
});

test("a 24 word mnemonic is generated properly", () => {
  expect(mnemonic24().split(' ').length).toEqual(24);
});

test("a 12 word mnemonic is different every time", () => {
  expect(mnemonic12()).not.toEqual(mnemonic12());
});

test("a 24 word mnemonic is different every time", () => {
  expect(mnemonic24()).not.toEqual(mnemonic24());
});