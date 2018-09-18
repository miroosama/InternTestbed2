const Wallet = (() => {
    let walletStore = {};
    let walletIds = 0;

    return class {
        constructor() {
            this.id = walletIds++;

            walletStore[this.id] = {
                derived: 0,
                address: [],
                utxo: [],
                stxos: [],
            }
        }

        generateMnemonic() {
            this.mnemonic = bip39.generateMnemonic();
            return this.mnemonic;
        }

        generateSeed(mnemonic) {
            // changed walletStore[this.id].mnemonic to just mnemonic for the sake 
            // of testing
            this.seed = bip39.mnemonicToSeed(mnemonic);
            return this.seed;
        }

        deriveAddresses(seed) {
            let network = bitcoin.networks.testnet;
            const root = bitcoin.bip32.fromSeed(this.seed, network);
            const arr = [];

            for (let i = 0; i < 3; i++) {
                let node = root.deriveHardened(44).deriveHardened(1).deriveHardened(0).derive(0).derive(walletStore[this.id].derived)
                arr.push(bitcoin.payments.p2pkh({
                    pubkey: node.publicKey,
                    network
                }).address)
                walletStore[this.id].derived++;
            }
            walletStore[this.id].address.push(arr)
            return arr;
            walletStore[this.id].deriveCounter++;
        }
    }
})();