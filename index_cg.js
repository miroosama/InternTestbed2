var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');
const request = require('request');

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
    }

};


const Wallet = (() => {

    let walletIds = 0;

    return class {
        constructor() {
            this.id = walletIds++;
        }

        generateMnemonic() {
            this.mnemonic = bip39.generateMnemonic();
            return this.mnemonic;
        }

        generateSeed(mnemonic) {
            this.seed = bip39.mnemonicToSeed(mnemonic);
            return this.seed;
        }

        deriveAddress(seed) {
            let network = bitcoin.networks.testnet;
            console.log(this.seed)
            const root = bitcoin.bip32.fromSeed(seed, network);
            let node = root.deriveHardened(44).deriveHardened(1).deriveHardened(0).derive(0).derive(0)
            //generate three addresses
            let addr = bitcoin.payments.p2pkh({
                pubkey: node.publicKey,
                network
            }).address
            address.push(addr)
            //need to create key value pair, address.(this.id) = "addr"
            return addr;
        }
    }
})();

const firstWallet = new Wallet();
const secondWallet = new Wallet();


// console.log(thisWallet.deriveAddress(thisWallet.generateSeed(thisWallet.generateMnemonic())));

const Transaction = (() => {

    API_URL = 'https://testnet.blockexplorer.com/api/addr/'

    let transaction
    let transactionId = 0;

    //need input for wallet # (needs input), address # (dynamic)

    return class {
        constructor(addr, recievingAddr, changeAddr) { 
            this.id = transactionId++;
            this.addr = address[0][0];
            this.recievingAddr = address[1][0];
            this.changeAddr = address[0][1];
        }


        async getUtxo(addr) {
            request.get(API_URL + addr + '/utxo', (err, req, body) => {
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
            transaction.addOutput(recievingAddr, amountToSend);
            transaction.addOutput(changeAddr, amountToKeep);
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
