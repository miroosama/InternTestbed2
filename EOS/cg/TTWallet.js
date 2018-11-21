const bitcoin = require('bitcoinjs-lib');
const ethUtil = require('ethereumjs-util');
const bip39 = require('bip39');

const mnemonic = bip39.generateMnemonic(256); //create new
const seed = bip39.mnemonicToSeed(mnemonic); 

const coinType = 1001;
const index = 0;

let networkUsed = bitcoin.networks.bitcoin;
const node = bitcoin.HDNode.fromSeedBuffer(seed, networkUsed);
const ETHNode = node.deriveHardened(44).deriveHardened(parseInt(coinType)).deriveHardened(index).derive(0).derive(0); 

    const pubkey = ETHNode.getPublicKeyBuffer().toString('hex');
    const privKeyBuffer = ETHNode.keyPair.d.toBuffer();
    const privkey = privKeyBuffer.toString('hex');
    const addressBuffer = ethUtil.privateToAddress(privKeyBuffer);
    const hexAddress = addressBuffer.toString('hex');
    const checksumAddress = ethUtil.toChecksumAddress(hexAddress);
    const address = ethUtil.addHexPrefix(checksumAddress);
    const pubkey = ethUtil.addHexPrefix(pubkey);

console.log('Private Key:' + privkey);
console.log("Public Key:"+ address);