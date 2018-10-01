const assert = require('chai').assert;
const Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider("http://13.58.39.53:8545"))
const Wallet = require('../classes/myEther')
const EtherTransactions = require('../classes/myEtherTx')
let wallet = new Wallet()
let mnemonic = "making a test mnemonic"
let testAccount = wallet.createAccount(mnemonic)
let testTx = new EtherTransactions(testAccount)

describe("wallet.createAccount", function(){
    it('createAccount should return an account object', function(){
        let ret = wallet.createAccount(mnemonic)
        assert.typeOf(ret, 'object' )
    })
})

describe("wallet.createAccount", function(){
    it('createAccount should return a valid address', function(){
        let ret = wallet.createAccount(mnemonic)
        assert.lengthOf(ret.address, '42' )
    })
})

describe("wallet.createAccount", function(){
    it('createAccount should return a valid private key', function(){
        let ret = wallet.createAccount(mnemonic)
        assert.lengthOf(ret.privateKey, '66' )
    })
})

// describe("etherTx.displayBalance", function(){
//     it('createAccount should return a balance integer', function(){
//         let ret = testTx.displayBalance()
//         assert.typeOf(ret, 'integer')
//     })
// })