const bitcoin = require('bitcoinjs-lib');
const ethUtil = require('ethereumjs-util');
const cnts = require('/var/dacc/Central/constants');
const Client = require("./client");

class ETHWallet {
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
    const node = bitcoin.HDNode.fromSeedBuffer(seed, bitcoin.networks.bitcoin); //use bitcoin network when working with ETH
    const ETHNode = node.deriveHardened(44).deriveHardened(parseInt(coinType)).deriveHardened(index).derive(0).derive(0); //matches MEW on custom path of m/44'/60'/0'/0 where (m/44'/60'/X'/0 --X = i in .deriveHardened(i))

    const pubkey = ETHNode.getPublicKeyBuffer().toString('hex');
    const privKeyBuffer = ETHNode.keyPair.d.toBuffer();
    const privkey = privKeyBuffer.toString('hex');
    const addressBuffer = ethUtil.privateToAddress(privKeyBuffer);
    const hexAddress = addressBuffer.toString('hex');
    const checksumAddress = ethUtil.toChecksumAddress(hexAddress);
    const address = ethUtil.addHexPrefix(checksumAddress);
    //privkey = ethUtil.addHexPrefix(privkey);
    const pubkey = ethUtil.addHexPrefix(pubkey);

    return new Account(address, privkey);
}

module.exports = ETHWallet;