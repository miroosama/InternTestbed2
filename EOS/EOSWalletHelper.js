const bitcoin = require('bitcoinjs-lib');
const eosUtil = require('eosjs-ecc');
class EOSWalletHelper {
    constructor(Seed) {
        this.seed = Seed;
    }
    getAccount(env, index, coinType) {
        return GetAccount(env, this.seed, index, coinType);
    }
}
class Account {
    constructor(Address, PrivateKey) {
        this.address = Address;
        this.privateKey = PrivateKey;
    }
}
function GetAccount(network, seed, index, coinType) {
    let networkUsed = bitcoin.networks.bitcoin;
    console.log("Network Used: ", networkUsed);
    console.log("EOS wallet helper get account. seed: %s index %s coinType %s" , seed, index, coinType);
    var node = bitcoin.HDNode.fromSeedBuffer(seed, networkUsed);
    var EOSNode = node.deriveHardened(44).deriveHardened(coinType).deriveHardened(index).derive(0).derive(0);
    var privKeyBuffer = EOSNode.keyPair.d;
    var privKey = eosUtil.PrivateKey(privKeyBuffer);
    var privKeyWIF = privKey.toWif();
    var address = privKey.toPublic().toString();
    return new Account(address, privKeyWIF);
}
EOSWalletHelper();



