var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');
const request = require('request');


const Wallet = (() => {
        let walletIds = 1;
        let mnemonic
        let addr

        return class {
            constructor(seed) {
                this.id = walletIds++;
                this.mnemonic = mnemonic;
                this.seed = seed;
                this.address = addr;
            }

            generateMnemonic() {
                mnemonic = bip39.generateMnemonic();
            }

            generateSeed(mnemonic) {
                seed = bip39.mnemonicToSeed(mnemonic);
            }

            deriveAddress(seed) {
                const network = bitcoin.networks.testnet;
                const root = bitcoin.bip32.fromSeed(seed, network);
                const path = "m/44'/1'/0'/0/0";
                const node = root.deriveHardened(44).deriveHardened(1).deriveHardened(0).derive(0).derive(0)
                address = bitcoin.payments.p2pkh({
                    pubkey: node.publicKey,
                    network
                }).address
            }

        }
    }
<<<<<<< HEAD
}
=======
})
>>>>>>> b5e627c89d529087f9a7d140e6fb8d81fb30ddc9
