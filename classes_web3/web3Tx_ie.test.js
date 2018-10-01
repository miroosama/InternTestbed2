const Web3 = require('web3');
const url = 'https://ropsten.infura.io/v3/13185919ce86442d9035a5424dccaa60';
const web3 = new Web3(url);

const {
  web3Tx
} = require('./web3Tx_ie')

const tx = new web3Tx;
const address = '0xdA0233Dfc4eF02998dacd5E75EC835Af70c8b04e'; //this address is taken from https://etherscan.io
const target = '0xf901367518aCE01dcE42afA84be17336f84A4f7c';
const prk = Buffer.from('2d57ab0d19019456b496ac10ed9a9cf1ed73aaf4959c472362ef72b3ece435ad', 'hex');

test("getBalance a promise", () => {
  expect(typeof tx.getBalance(address)).toEqual("object");
});

test("getBalance returns a promise that can be resolved", () => {
  return tx.getBalance(address).then(resp => {
    expect(typeof parseInt(resp, 10)).toEqual("number")
  })
})

test("makeTx returns an object", () => {
  expect(typeof tx.makeTx()).toEqual("object");
});

// test("makeTx returns a promise that can be resolved", async () => {
//   return await tx.makeTx(address, target, '0.01', prk).then(resp => {
//     expect(typeof resp).toEqual("string")
//   })
// })

test("makeTx returns a promise that can be resolved", async () => {
  return await tx.makeTx(address, target, '0.01', prk).then(setTimeout(() => {
    resp => {
      expect(typeof resp).toEqual("string")
    }
  }, 3000))
});