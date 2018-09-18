export.BTCWallet = (() => {

    let walletIds = 1;
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
            return seed = bip39.mnemonicToSeed(mnemonic);
        }

        deriveAddress(seed) {
            const network = bitcoin.networks.testnet;
            const root = bitcoin.bip32.fromSeed(seed, network);
            const path = "m/44'/1'/0'/0/0";
            const node = root.deriveHardened(44).deriveHardened(1).deriveHardened(0).derive(0).derive(0);
            let address = bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address;
        }
        
    }
})()