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

const firstWallet = new Wallet();
const secondWallet = new Wallet();


// console.log(thisWallet.deriveAddress(thisWallet.generateSeed(thisWallet.generateMnemonic())));



const Transaction = (() => {

    let walletStore = {

        0:{
            address : [
                ["wow", "it", "works!"],
                ["im", "so", "happy"],
                ["addr", "changeAddr", "recievingAddr"]   
            ],
            utxo: []
        },
    
        1: {
            address: [
                ["addr", "changeAddr", "recievingAddr"]   
            ],
            utxo: []
        },
        
        2: {
            address: [
                ["addr", "changeAddr", "recievingAddr"]   
            ],
            utxo: []
        }
    
    };


    API_URL = 'https://testnet.blockexplorer.com/api/addr/';

    let transaction;
    let myWallet
    let theirWallet

    let transactionId = 0;

    //dynamincally input wallet # that are involved in the transaction, we would know the wallet numbers by the name they provide

    return class {
        constructor(myWallet, theirWallet) { 
            this.id = transactionId++;
            this.myWallet = 
            this.addr = walletStore[0].address[0][0];
            this.changeAddr = walletStore[0].address[0][1];
            this.recievingAddr = walletStore[1].address[0][2];
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
