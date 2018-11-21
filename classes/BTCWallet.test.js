const Wallet = require('./BTCWallet');
const BTCTx = require('./BTCTx');
var fs = require('fs')

const mnemonic = "human sun wall return tragic bless detail foot rescue gown deer clerk body certain casual";

test("Wallet is an object", () => {

  expect(typeof Wallet).toEqual("function")
});

test("when called Wallet instantiates a new wallet", () => {
  let newWallet = new Wallet()
  expect(typeof newWallet).toEqual("object")
});

test("when wallet takes a mnemonic, it derives a hardened pubkey", () => {
  let newWallet = new Wallet(mnemonic)
  expect(newWallet.createAccount()).toEqual("tpubDDqsmgCAQcyC1DphJRnSqcSeeDwBVwEv2dsDCMce5nkqemUHggNCkqY8PNz6iwtJw7YDtS5fKCJF7jzaBABkEr5vw7GNTM3gJ1Rw6eheoGc")
});

test("account info should return an array of addresses", () => {
  let account = fs.readFileSync('./classes/accounts/tpubDFe6R4ftoEmXJyTBufCo5gzZR41Xkuhegyqt2XQuc5WiZ27yJtq4V3T2nJr2yVNbU3jJmpYCiSiwH7k4QJkqNKqrA1crMQksucUcKQjTDF6.json', 'utf8')

  let btctx = new BTCTx(account)
  expect(typeof btctx.accountInfo()).toEqual("object")
});

