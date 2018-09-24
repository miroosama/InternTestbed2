const bitcoin = require('bitcoinjs-lib');
const CoinSelect = require('coinselect');
const Telnet = require('telnet-client');
const netwrk = {
    messagePrefix: '\u0018DarkNet Signed Message:\n',
    bip32: {
        public: 0x3a8061a0,
        private: 0x3a805837
      },
    pubKeyHash: 0x8b,
      scriptHash: 0x13,
      wif: 0xef
};

class UnsignedTransaction {
    constructor(accountExtendedPublicKey) {
        this.node = bitcoin.HDNode.fromBase58(accountExtendedPublicKey, netwrk);
    }

    makeRequest() {
        return new Promise((resolve, reject) => {
            let connection = new Telnet();

            let params = {
                host: '52.15.73.204',
                port: 50001,
                shellPrompt: '/ # ',
                timeout: 15000
            }

            connection.on('error', (err) => console.log(err))

            connection.on('timeout', (res) => {
                console.log('timed out')
                connection.end()
            })

            connection.connect(params)

            resolve(connection)
        })
    }

    getData(connection, endpoint, params) {
        return new Promise((resolve, reject) => {
            let request = {
                id: "Intern",
                params: [`${params}`]
            }
            request.method = endpoint === "estimatefee" ? 'blockchain.estimatefee' : `blockchain.address.${endpoint}`;
            connection.send(JSON.stringify(request), (e, r) => {
                if (e) {
                    reject(e);
                } else {
                    resolve(JSON.parse(r))
                }
            });
        });
    }

    async gatherTxHistory(connection) {
        console.log("Checking External Addresses...");
        let unusedAddresses = 0;
        let addressIndex = 0;
        let intExtIndex = 0;
        let history = [];
        let changeAddress;
        return new Promise((resolve, reject) => {
            connection.on('connect', async () => {
                while (unusedAddresses < 20) {
                    let address = this.node.derive(intExtIndex).derive(addressIndex).getAddress();
                    let txHistory = await this.getData(connection, "get_history", address)
                    if (!txHistory.result.length && !changeAddress && intExtIndex === 1) {
                        console.log("Change Address Found...")
                        changeAddress = address;
                    }
                    if (!txHistory.result.length && unusedAddresses === 19 && intExtIndex === 0) {
                        console.log("Checking Internal Addresses...")
                        intExtIndex = 1;
                        addressIndex = 0;
                        unusedAddresses = 0;
                    } else if (!txHistory.result.length) {
                        unusedAddresses++;
                        addressIndex++;
                    } else {
                        history.push(address);
                        unusedAddresses = 0;
                        addressIndex++;
                    }
                }
                resolve({
                    history,
                    changeAddress
                })
            })
        })
    }

    async getUTXOS(connection, addresses) {
        console.log("Searching for UTXOS...")
        let array = []
        for (let i = 0; i < addresses.length; i++) {
            let response = await this.getData(connection, "listunspent", addresses[i])
            response.result.forEach(utxo => {
                utxo.address = addresses[i]
                array.push(utxo)
            })
        }
        return array
    }

    async calculateFees() {
        let connection = await this.makeRequest()
        let recommendedFees = await this.getData(connection, "estimatefee", 1)
        let feeInSatoshis = parseFloat(recommendedFees.result) * 100000000
        let feePerByte = Math.ceil(feeInSatoshis / 1000)
        connection.end()
        console.log(feePerByte)
        return feePerByte
    }
    

    async getBalance() {
        console.log("Getting Account Information...")
        let connection = await this.makeRequest();
        console.log("Checking Transaction History...")
        let details = await this.gatherTxHistory(connection);
        let utxos = await this.getUTXOS(connection, details.history)
        connection.end()
        console.log("Calculating Account Balance...")
        let changeAddress = details.changeAddress
        let balance = utxos.reduce((acc, cur) => cur.value + acc, 0) / 100000000
        return {
            utxos,
            balance,
            changeAddress
        };
    }

    coinSelection(ins, output) {
        let utxos = ins.map(tx => ({
            txId: tx.tx_hash,
            vout: tx.tx_pos,
            value: tx.value,
            address: tx.address
        }));
        let targets = [{
            address: output.outputAddress,
            value: output.outputAmount
        }]
        let feeRate = output.feeRate;
        let {
            inputs,
            outputs,
            fee
        } = CoinSelect(utxos, targets, feeRate);
        if (!inputs || !outputs) {
            return false;
        } else {
            let addresses = inputs.map(input => input.address)
            return {
                inputs,
                outputs,
                fee,
                addresses
            };
        }
    }

    createTransaction(accountInfo, destinationData) {
        console.log("Building Transaction...")
        destinationData.outputAmount = destinationData.outputAmount
        let goal = destinationData.outputAmount
        let utxo = accountInfo
        if (utxo.balance > goal && utxo.utxos.length) {
            let optimizedCoinSelection = this.coinSelection(utxo.utxos, destinationData)
            if (optimizedCoinSelection) {
                let txBuilder = new bitcoin.TransactionBuilder(netwrk);
                optimizedCoinSelection.inputs.forEach(input => {
                    txBuilder.addInput(input.txId, input.vout)
                })
                optimizedCoinSelection.outputs.map(output => {
                    if (!output.address) {
                        txBuilder.addOutput(accountInfo.changeAddress, output.value)
                    } else {
                        txBuilder.addOutput(output.address, output.value)
                    }
                })
                let tx = txBuilder.buildIncomplete()
                return {
                    tx: tx.toHex(),
                    addresses: optimizedCoinSelection.addresses
                }
            } else {
                console.log("Balance too low to cover fee!");
                return false;
            }
        } else {
            console.log("Not enough funds!")
            return false
        }
    }
}

new UnsignedTransaction();