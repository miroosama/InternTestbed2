const Transaction = (() => {

    API_URL =  'https://testnet.blockexplorer.com/api/addr/'

    let addr
    let balance
    let pubkey
    let prikey
    let txid
    
    return class {
        constructor() {
            this.addr = addr;
            this.pubkey = pubkey;
            this.prikey = prikey;
            this.tx = tx;
            this.txid = txid;
            this.balance = balance;
        }

        deriveAddress(seed) {
            const network = bitcoin.networks.testnet;
            const root = bitcoin.bip32.fromSeed(seed, network);
            const path = "m/44'/1'/0'/0/0";
            const node = root.deriveHardened(44).deriveHardened(1).deriveHardened(0).derive(0).derive(0)
            addr = bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address
        }

        getUtxo(addr) {
            request.get(API_URL + addr + '/utxo', (err, req, body) => {
                tx = JSON.parse(body)
                utxo.push(tx)
                console.log(tx)
            }
        }

        getBalance(addr) {
            request.get(API_URL + addr + '/balance', (err, req, body) => {
                balance = JSON.parse(body)
                console.log(balance)
             }
        }

    }
})