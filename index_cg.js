var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');
const request = require('request');

let seed


const Wallet = (() => {

    let walletIds = 1;
    let mnemonic

    return class {
        constructor(seed) {
            this.id = walletIds++;
            this.mnemonic = mnemonic;
        }

        generateMnemonic() {
            return mnemonic = bip39.generateMnemonic();
        }

        generateSeed(mnemonic) {
            return seed = bip39.mnemonicToSeed(mnemonic);
        }

        deriveAddress(seed) {
            const network = bitcoin.networks.testnet;
            const root = bitcoin.bip32.fromSeed(seed, network);
            const path = "m/44'/1'/0'/0/0";
            const node = root.deriveHardened(44).deriveHardened(1).deriveHardened(0).derive(0).derive(0);
            const address = bitcoin.payments.p2pkh({
                pubkey: node.publicKey,
                network
            }).address;
        }

    }
})();

const Transaction = (() => {

    API_URL = 'https://testnet.blockexplorer.com/api/addr/'
    const utxo = [];

    let addr
    let balance
    let pubkey
    let privkey
    let txid

    return class {
        constructor() {
            this.addr = addr;
            this.pubkey = pubkey;
            this.privkey = privkey;
            this.tx = tx;
            this.txid = txid;
            this.balance = balance;
        }

        deriveAddress(seed) {
            const network = bitcoin.networks.testnet;
            const root = bitcoin.bip32.fromSeed(seed, network);
            const path = "m/44'/1'/0'/0/0";
            const node = root.deriveHardened(44).deriveHardened(1).deriveHardened(0).derive(0).derive(0)
            addr = bitcoin.payments.p2pkh({
                pubkey: node.publicKey,
                network
            }).address
        }

        getUtxo(addr) {
            request.get(API_URL + addr + '/utxo', (err, req, body) => {
                tx = JSON.parse(body)
                utxo.push(tx)
                console.log(tx)
            })
        }

        getBalance(addr) {
            request.get(API_URL + addr + '/balance', (err, req, body) => {
                balance = JSON.parse(body);
                console.log(balance);
            });
        }

        createTransaction() {
            let transaction = new bitcoin.TransactionBuilder(network);
            tx.id;
        }

        signTransaction() {
            privkey = node.toWIF()
            let signature = bitcoin.ECPair.fromWIF(prikey, network);
            tx.sign(0, signature)
        }

    }
})();