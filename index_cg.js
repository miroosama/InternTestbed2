var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');
const request = require('request');

let seed

const Wallet = (() => {

    let walletIds = 0;
    let mnemonic

    return class {
        constructor() {
            this.id = walletIds++;
            this.mnemonic = mnemonic; 
        }

        generateMnemonic() {
            return mnemonic = bip39.generateMnemonic();
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
            let address = bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address;
        }
        
    }
})();

const thisWallet = new Wallet();
console.log(thisWallet.generateMnemonic())
console.log(thisWallet.generateSeed())

const Transaction = (() => {
    //maybe we should store addr, balance pub/prv keys in wallet?
    //while they are used to create transactions, these data live 
    //in a wallet 
    API_URL =  'https://testnet.blockexplorer.com/api/addr/'

    let addr 
    let balance
    let pubkey
    let privkey
    let txid
    let changeAddr

    let transactionid = 0;
    let utxo = [];
    
    return class {
        constructor() {
            this.id = transactionId++;
            this.addr = addr;
            this.pubkey = pubkey;
            this.prikey = privkey;
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

        async getBalance(addr) {
            request.get(API_URL + addr + '/balance', (err, req, body) => {
                console.log(JSON.parse(body))
            })
        }

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

        signTransaction(transaction) {
            prikey = node.toWIF();
            let signature = bitcoin.ECPair.fromWIF(prikey, network);
            transaction.sign(0, signature);
        }

        getHex(transaction) {
            let tx = transaction.build();
            txhex = tx.toHex();
        }

        pushTransaction(tx) {
            //one day we will achieve this impossible task
        }

    }
})();
