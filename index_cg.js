var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');
const request = require('request');

let address = [];
let utxo = [];

const Wallet = (() => {

    let walletIds = 0;
    let mnemonic
    let seed

    return class {
        constructor() {
            this.id = walletIds++;
        }

        generateMnemonic() {
            mnemonic = bip39.generateMnemonic();
            return mnemonic;
        }

        generateSeed(mnemonic) {
            seed = bip39.mnemonicToSeed(mnemonic);
            return seed;
        }

        deriveAddress(seed) {
            const network = bitcoin.networks.testnet;
            const root = bitcoin.bip32.fromSeed(seed, network);
            const path = "m/44'/1'/0'/0/0";
            const node = root.deriveHardened(44).deriveHardened(1).deriveHardened(0).derive(0).derive(0);
            addr = bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address;
            address.push(addr);
        }
        
    }
})();

const thisWallet = new Wallet();
console.log(thisWallet.generateMnemonic())
console.log(thisWallet.generateSeed())

const Transaction = (() => {

    API_URL =  'https://testnet.blockexplorer.com/api/addr/'

    let balance
    let pubkey
    let privkey
    let txid
    let changeAddr

    let transactionId = 0;
    
    return class {
        constructor(addr) {
            this.id = transactionId++;
            this.addr = addr;
            this.txid = txid;
            this.changeAddr = changeAddr;
            this.balance = balance;
        }

        deriveAddress(seed) {
            const network = bitcoin.networks.testnet;
            const root = bitcoin.bip32.fromSeed(seed, network);
            const path = "m/44'/1'/0'/0/0";
            const node = root.deriveHardened(44).deriveHardened(1).deriveHardened(0).derive(0).derive(0)
            addr = bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address
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
            let transaction = new bitcoin.TransactionBuilder(network);

            //handle amounts
            let amountWeHave = utxo[this.id].satoshis
            let amountToKeep = amountWeHave - 400
            let transactionFee = 100
            let amountToSend = amountWeHave - amountToKeep - transactionFee

            //input
            transaction.addInput(utxo[this.id].txid, 0); 

            //outputs(0,1)
            transaction.addOutput(recievingAddr="mmGR83JQaV5cFkNmG8TcWERTjPu69kK6J5", amountToSend);
            transaction.addOutput(changeAddr="mr3Pon6aTEQa7XGUa7iuooJjHHy71jL4rn", amountToKeep);
        }

        signTransaction() {
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
