const Transaction = (() => {

    let transactionIndex = 0;

    return class {
        constructor(sender, reciever) {
            this.index = transactionIndex++;
            this.sender = sender;
            this.reciever = sender;
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