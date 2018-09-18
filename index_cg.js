var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');
const request = require('request');

let walletStore = { };

const Wallet = (() => {

    let walletIds = 0;

    return class {
        constructor() {
            this.id = walletIds++;
            walletStore[this.id] = { 
                derived: 0,
                address:[],
                utxo: [],
                stxos: [],
                deriveCounter: 0
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
            const root = bitcoin.bip32.fromSeed(seed, network);
            const arr = [];

            let i = walletStore[this.id].derive
            console.log(i)
            for (i = 0; i < 3; i++) {
                let node = root.deriveHardened(44).deriveHardened(1).deriveHardened(0).derive(0).derive(i++)
                arr.push(bitcoin.payments.p2pkh({pubkey: node.publicKey, network}).address)
                walletStore[this.id].derive++;
            }
            walletStore[this.id].address.push(arr)
            return arr;
            walletStore[this.id].deriveCounter++;
        }
    }
})();

// console.log(thisWallet.deriveAddress(thisWallet.generateSeed(thisWallet.generateMnemonic())));

// let new0 = new Wallet();
// new0.deriveAddresses(new0.generateSeed(new0.generateMnemonic()))
// sender0 = new0
// let new1 = new Wallet();
// new1.deriveAddresses(new1.generateSeed(new1.generateMnemonic()))
// sender1 = new1

const Transaction = (() => {

    API_URL = 'https://testnet.blockexplorer.com/api/addr/';
    
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
            //one day we will achieve this!!
        }

        // async addUtxo(addr) {
        //     request.get(API_URL + this.addr + '/utxo', (err, req, body) => {
        //         let tx = JSON.parse(body)
        //         walletStore[this[this.indexutxo.push(tx)
        //         console.log(tx)
        //     })
        // }

    }
})();

const firstTransaction = new Transaction();
const secondTransaction = new Transaction();
