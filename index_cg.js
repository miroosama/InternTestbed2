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
                address:[],
                utxo: []
            }
        }

        generateMnemonic() {
            this.mnemonic = bip39.generateMnemonic();
            return this.mnemonic;
        }

        generateSeed(mnemonic) {
            this.seed = bip39.mnemonicToSeed(mnemonic);
            return this.seed;
        }

        deriveAddresses(seed) {
            let network = bitcoin.networks.testnet;
            const root = bitcoin.bip32.fromSeed(seed, network);
            let node = root.deriveHardened(44).deriveHardened(1).deriveHardened(0).derive(0).derive(0)
            const arr = [];
            for (let i = 0; i < 3; i++) {
                arr.push(bitcoin.payments.p2pkh({pubkey: node.publicKey, network}).address)
                }
            walletStore[this.id].address.push(arr)
            return arr;
        }
    }
})();

// console.log(thisWallet.deriveAddress(thisWallet.generateSeed(thisWallet.generateMnemonic())));

let new0 = new Wallet();
new0.deriveAddresses(new0.generateSeed(new0.generateMnemonic()))
sender0 = new0
let new1 = new Wallet();
new1.deriveAddresses(new1.generateSeed(new1.generateMnemonic()))
sender1 = new1

const Transaction = (() => {

    API_URL = 'https://testnet.blockexplorer.com/api/addr/';
    
    let transactionIndex = 0;

    return class {
        //we are passing in variables of whole wallet instances, there could be a convention for how we save them
        constructor(sender, reciever) { 
            this.index = transactionIndex++;
            this.sender = sender0;
            this.reciever = sender1; 
            this.addr = walletStore[sender0.id].address[this.index][0];
            this.changeAddr = walletStore[sender0.id].address[this.index][1];
            this.recievingAddr = walletStore[sender1.id].address[this.index][2];
            
        }


        async getUtxo(addr) {
            request.get(API_URL + this.addr + '/utxo', (err, req, body) => {
                let tx = JSON.parse(body)
                utxo.push(tx)
                console.log(tx)
            })
        }

        // async getBalance(addr) {
        //     request.get(API_URL + addr + '/balance', (err, req, body) => {
        //         balance = JSON.parse(body)
        //         console.log(balance)
        //     })
        // }

        // exports.checkBalance = (addr) => {
        //     const url = "https://api.blockcypher.com/v1/btc/test3/addrs/" + addr
        //     return new Promise( (resolve, reject) => {
        //         request( {url: url}, (err,resp,body) => {
        //             if (err) {
        //                 reject(err);
        //             } else {
        //                 resolve({
        //                     balance: JSON.parse(body).balance,
        //                     unconfirmed_balance: JSON.parse(body).unconfirmed_balance,
        //                     final_balance: JSON.parse(body).final_balance                    
        //                 })
        //             }
        //         })
        //     }) 
        // }

        createTransaction(recievingAddr, changeAddr) {
            transaction = new bitcoin.TransactionBuilder(network);

            //handle amounts
            let amountWeHave = utxo[this.id - 1].satoshis;
            let amountToKeep = amountWeHave - 400;
            let transactionFee = 100;
            let amountToSend = amountWeHave - amountToKeep - transactionFee;

            //input
            transaction.addInput(utxo[this.id - 1].txid, 0);

            //outputs(0,1)
            transaction.addOutput(this.recievingAddr, amountToSend);
            transaction.addOutput(this.changeAddr, amountToKeep);
        }

        signTransaction(transaction, node, network) {
            prikey = node.toWIF();
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

    }
})();

const firstTransaction = new Transaction();
const secondTransaction = new Transaction();
