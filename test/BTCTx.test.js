const {
  BTCTx
} = require('../classes/BTCTx')

const tx = new BTCTx;
const sendAddr = "mfrU7eT9mXTSizqG1z2hynjKse8T9JNpiW";
const changeAddr = "mgTaJF2s7x8QdLUN91YGFCg134UwG121io";
const prk = "cNVu4ia2waxd7qb6LNauU9haMG9bd5JCRCpferBN9Lq4uZgjLNch";

let utxoData = [{
  txId: '0ba9a0e797c2af0c5715552a8d2f28606fba8c9909c726cb8f9bc73e285e3dc4',
  vout: 1,
  value: 4230000
}]

let scripthash = "8b01df4e368ea28f8dc0423bcf7a4923e3a12d307c875e47a0cfbf90b5c39161"

test("BTCTx is an object", () => {
  expect(typeof tx).toEqual("object")
});

test("getBalance returns a promise", () => {
  expect(typeof tx.getBalance()).toBe("object")
});

// test("getBalance returns a promise that can be resolved", () => {
//   return tx.getBalance().then(resp => {
//     expect(Object.keys(resp).length).toBeGreaterThan(0);
//   });
// });

test("checkUTxO returns a promise", () => {
  expect(typeof tx.checkUTxO(sendAddr, 100, changeAddr, prk, scripthash)).toBe("object")
});

// test("checkUTxO returns a promise that can be resolved", () => {
//   return tx.checkUTxO(sendAddr, 100, changeAddr, prk, scripthash).then(resp => {
//     expect(Object.keys(resp).length).toBeGreaterThan(0);
//   });
// });

test("transactionBuilding returns a promise", () => {
  expect(typeof tx.transactionBuilding(utxoData, sendAddr, 100, changeAddr, prk)).toBe("object")
});

// test("transactionBuilding returns a promise that can be resolved", () => {
//   return tx.transactionBuilding(utxoData, sendAddr, 100, changeAddr, prk).then(resp => {
//     expect(Object.keys(resp).length).toBeGreaterThan(0);
//   });
// });