const bitcoin = require('bitcoinjs-lib');
const eosUtil = require('eosjs-ecc');
const bip39 = require("bip39");
class EOSWalletHelper {
    constructor(Seed) {
        this.seed = Seed;
    }
    getAccount(index, coinType) {
        return GetAccount(this.seed, index, coinType);
    }
}
class Account {
    constructor(Address, PrivateKey) {
        this.address = Address;
        this.privateKey = PrivateKey;
    }
}
function GetAccount(seed, index, coinType) {
    let networkUsed = bitcoin.networks.bitcoin;
    console.log("Network Used: ", networkUsed);
    console.log("EOS wallet helper get account. seed: %s index %s coinType %s" , seed, index, coinType);
    var node = bitcoin.HDNode.fromSeedBuffer(seed, networkUsed);
    var EOSNode = node.deriveHardened(44).deriveHardened(coinType).deriveHardened(index).derive(0).derive(0);
    var privKeyBuffer = EOSNode.keyPair.d;
    var privKey = eosUtil.PrivateKey(privKeyBuffer);
    var privKeyWIF = privKey.toWif();
    var address = privKey.toPublic().toString();
    console.log(address, privKey)
    return new Account(address, privKeyWIF);
}
let seed = bip39.mnemonicToSeed('eight person fade off border garden ugly borrow rhythm bronze gadget combine tower list bus raven flock ethics adult task galaxy detect tilt envelope');

let ew = new EOSWalletHelper(seed).getAccount(43, 0);





