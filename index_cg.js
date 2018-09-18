var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');
const request = require('request');

let walletStore = {};

//hi! what would you like to do?
// create a wallet  |  send money

//***create a wallet***
//what would you like this wallet to be called?
// gets.chomp input equivalent 

//***generate a faucet with a specified amount***
//you have x BTC in your wallet! spend it wisely. use the command BLANK to add x BTC if your funds are too low.

//hi! what would you like to do?
// create a wallet  |  send money

//***send money***
//what is your wallet called?
// gets.chomp input equivalent

//what is the name of the wallet you would like to send money to?
// gets.chomp input equivalent

//your balance is x BTC. How much would you like to send to *string of last input*?
// gets.chomp input equivalent

// how much would you like to pay in miner's fees?
// gets.chomp input equivalent

// With these amounts, you will be left with x BTC in your wallet. Does that sound good to you?
// yes, send!  |  adjust amounts

//**adjust amounts**//
//How much would you like to send to *string of last input*?
// how much would you like to pay in miner's fees?
// gets.chomp input equivalent
// With these amounts, you will be left with x BTC in your wallet. Does that sound good to you?
// yes  |  adjust amounts

//**yes, send!**//
// great! you have send x BTC to *name of recipient wallet.*

//setTimeout to restart?










const Wallet = (() => {

    let walletIds = 0;

    return class {
        constructor() {
            this.id = walletIds++;

            walletStore[this.id] = {
                derived: 0,
                address: [],
                utxo: [],
                stxos: [],
            }
        }

        generateMnemonic() {
            this.mnemonic = bip39.generateMnemonic();
            return walletSTthis.mnemonic;
        }

        generateSeed(mnemonic) {
            this.seed = bip39.mnemonicToSeed(walletStore[this.id].mnemonic);
            return this.seed;
        }

        deriveAddresses(seed) {
            let network = bitcoin.networks.testnet;
            const root = bitcoin.bip32.fromSeed(this.seed, network);
            const arr = [];

            for (i = 0; i < 3; i++) {
                let node = root.deriveHardened(44).deriveHardened(1).deriveHardened(0).derive(0).derive(walletStore[this.id].derived)
                arr.push(bitcoin.payments.p2pkh({
                    pubkey: node.publicKey,
                    network
                }).address)
                walletStore[this.id].derived++;
            }
            walletStore[this.id].address.push(arr)
            return arr;
            walletStore[this.id].deriveCounter++;
        }
    }
})();

console.log(thisWallet.deriveAddress(thisWallet.generateSeed(thisWallet.generateMnemonic())));

let test = new Wallet()
let new0 = new Wallet();
new0.deriveAddresses(new0.generateSeed(new0.generateMnemonic()))
sender0 = new0
let new1 = new Wallet();
new1.deriveAddresses(new1.generateSeed(new1.generateMnemonic()))
sender1 = new1

const Transaction = (() => {

    let transactionIndex = 0;

    return class {
        constructor(sender, reciever) {
            this.index = transactionIndex++;
            this.sender = sender0;
            this.reciever = sender1;
            // this.addr = walletStore[sender0.id].address[this.index][0];
            // this.changeAddr = walletStore[sender0.id].address[this.index][1];
            // this.recievingAddr = walletStore[sender1.id].address[this.index][2];
        }

        // async getBalance(addr) {
        //     request.get(API_URL + addr + '/balance', (err, req, body) => {
        //         balance = JSON.parse(body)
        //         console.log(balance)
        //     })
        // }

        createTransaction() {
            transaction = new bitcoin.TransactionBuilder(network);

            //handle amounts
            // let amountWeHave = walletStore[this.sender[transactionid].utxo[this.id - 1].satoshis;
            let amountToKeep = amountWeHave - 400;
            let transactionFee = 100;
            let amountToSend = amountWeHave - amountToKeep - transactionFee;

            //input
            // transaction.addInput(utxo[this.id - 1].txid, 0);

            //outputs(0,1)
            transaction.addOutput(this.recievingAddr, amountToSend);
            transaction.addOutput(this.changeAddr, amountToKeep);
        }

        signTransaction(transaction, node, network) {
            prikey = this.node.toWIF();
            let signature = bitcoin.ECPair.fromWIF(prikey, network);
            transaction.sign(0, signature);
        }

        getHex(transaction) {
            let tx = transaction.build();
            txhex = tx.toHex();
        }

        pushTransaction(tx) {
            //one day!
        }
    }
})();

module.exports = {
    Transaction
};

const firstTransaction = new Transaction();
const secondTransaction = new Transaction();

// console.log(new0.generateMnemonic())

// console.log(Wallet)