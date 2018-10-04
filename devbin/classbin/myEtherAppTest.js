const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const { User } = require('./myEtherApp');


describe("User Class", () => {

    describe('#constructor', () => {
        it('can create an account with a mnemonic', () => {
            const heyo = new User();
            expect(heyo.mnemonic).to.equal("");
        })
    })

    describe('#createEtherWallet', () => {
        it('associate an account with a new instance of wallet', () => {
            let newAccount = heyo.createEtherWallet()
            assert.isObject(wallet, 'wallet is an object')
        })
        it('adds a wallet to the account', () => {
            expect(newAccount.wallet[0]).to.be.instanceOf(Wallet);
        });
    })

    describe('#sendMoney', () => {
        it('should return a hexadecimal string', () => {
            expect(txid).toBeA('string');
        })
    })

    describe('#checkBalance', () => {
        it('should async check balance', () => {
            app.asyncCheckBalance(this.account, (balance) => {
                expect(balance).toBeA('string')
            })
        }),
        it('can check the balance of the account', () => {
            console.log(this.account)
        })
    })
});
