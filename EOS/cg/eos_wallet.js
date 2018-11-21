const bitcoin = require('bitcoinjs-lib')
const bip39 = require('bip39')
const hdkey = require('hdkey')
const fs = require('fs')

            const mnemonic = bip39.generateMnemonic()

            const network = bitcoin.networks.testnet
            const seed = bip39.mnemonicToSeed(mnemonic)
            const root = hdkey.fromMasterSeed(mnemonic)

            // const masterPrivateKey = root.privateKey.toString('hex')
            // console.log(masterPrivateKey)

            
            const derived = root.derivePath("m/44'/0'/0'/0/0")
            console.log('THE PATH:', derived)

            const keyPair = bitcoin.ECPair.makeRandom({ network })
            console.log('KEYPAIR:', keyPair)
            const publicKey = keyPair.publicKey.toString('hex')
            const privateKey = keyPair.toWIF()
            console.log(publicKey, privateKey)

            const ourWallet = new bitcoin.ECPair.fromWIF(privateKey, network )

            console.log(ourWallet.publicKey.toString('hex'))





            // const addressnode = root.derive("m/44'/0'/0'/0/0")
            // const pubkey = addressnode._publicKey
            // const privatekey = addressnode._privateKey
            // // const network = bitcoin.networks.testnet
            // const { address } = bitcoin.payments.p2pkh({ pubkey, network })
            // console.log(address)
            // fs.writeFileSync(`./addresses.json`, 'the private key: ' + JSON.stringify(privatekey), (err) => { if (err) throw err; } )
  
    
    // const hey = new Wallet()
    // console.log(hey)
    // const test = hey.createAccount()
    // console.log(test)
    // new.createAccount()

// const mnemonic = bip39.generateMnemonic()
// const seed = bip39.mnemonicToSeed(mnemonic)

// const root = hdkey.fromMasterSeed(seed)
// const addressnode = root.derive("m/44'/0'/0'/0/0")
// const pubkey = addressnode._publicKey
// const privatekey = addressnode._privateKey.toString('base64')        
// const network = bitcoin.networks.testnet
// const { address } = bitcoin.payments.p2pkh({ pubkey, network })
// fs.writeFileSync(`./addresses.json`, 'the private key: ' + JSON.stringify(privatekey), (err) => { if (err) throw err })


// const sender = bitcoin.ECPair.fromWIF(privatekey)
// console.log("alice: ", sender)
// console.log(address)

// fs.writeFileSync(`../InternTestbed2/cold/accounts/${extendedPubExt}`, JSON.stringify(extPrv))


// exports.BTCWallet = (() => {
//     return class {
//       constructor(mnemonic = "") {
//         this.mnemonic = mnemonic
//       }
  
//       async createAccount() {
//         let seed = bip39.mnemonicToSeed(this.mnemonic);
//         let root = bitcoin.bip32.fromSeed(seed, network)
//         let node = root.deriveHardened(44).deriveHardened(1).deriveHardened(0)
//         let nodeSend = node.neutered().toBase58()
//         let intNode = node.derive(1)
//         let extNode = node.derive(0)
//         let extendedPubExt = extNode.neutered().toBase58()
//         let extendedPubInt = intNode.neutered().toBase58()
//         let extPrv = extNode.toBase58()
//         fs.writeFileSync(`../InternTestbed2/cold/accounts/${extendedPubExt}`, JSON.stringify(extPrv))
//         let path = await USBAdapter.getPath().catch(err => {
//           console.log(err)
//         })
//         fs.writeFileSync(`${path}/${extendedPubExt}.json`, JSON.stringify(nodeSend))
//         // console.log(node) 
//       }
//     }
//   })();


































// const bip39 = require('bip39')
// const hdkey = require('hdkey')
// const createHash = require('create-hash')
// const bs58check = require('bs58check')

// const mnemonic = "lumber brown bamboo motor angle strategy brass plunge claw differ uniform host"
// // const mnemonic = bip39.generateMnemonic()
// const seed = bip39.mnemonicToSeed(mnemonic)
// const root = hdkey.fromMasterSeed(seed)
// // const masterPrivateKey = root.privateKey.toString('hex')
// const addressnode = root.derive("m/44'/0'/0'/0/0")
// const publickey = addressnode._publicKey
// const sha256publickey = createHash('sha256').update(publickey).digest()
// const ripemd160publickey = createHash('rmd160').update(sha256publickey).digest()
// const versionbytepublickey = Buffer.allocUnsafe(21)
// versionbytepublickey.writeUInt8(0x6f, 0)
// ripemd160publickey.copy(versionbytepublickey, 1)
// const address = bs58check.encode(versionbytepublickey)
// console.log(address)







































































// const bip39 = require('bip39')
// const hdkey = require('hdkey')
// const createHash = require('create-hash')
// const bs58check = require('bs58check')

// // start the tree
// // 1. start with a random bit of data (128 entropy)
// // 2. convert that data to a mnemonic phrase (12-24 randomized word chain)
// const mnemonic = bip39.generateMnemonic()
// console.log(mnemonic)
// // 3. convert that mnemonic to a seed (the data source for the tree)
// const seed = bip39.mnemonicToSeed(mnemonic)

// // generate the root of the tree
// // 1. generate the root from the seed (data source)
// const root = hdkey.fromMasterSeed(seed)
// // console.log("ROOT!", root)
// // 2. get the masterPrivateKey
// const masterPrivateKey = root.privateKey.toString('hex')
// console.log("Master Private Key:", masterPrivateKey)
// //we now have our root node

// // generate the rest of the tree

// //BIP 44 set in place a derivation path to reach consensus (think HTTProtocol, Restful Routing)
// // m / purpose' / coin_type' / account' / change / address_index
// // m /   44'   /      0'    /    0'    /   0    /        0
// const addressnode = root.derive("m/44'/0'/0'/0/0")
// console.log("Address Node:", addressnode)

// // // get and encrypt your public key

// // // step 1: get your public key
// const publickey = addressnode._publicKey
// console.log("Public Key:", publickey)
// // // step 2: Perform SHA-256 hashing on the public key
// const sha256publickey = createHash('sha256').update(publickey).digest()
// console.log("SHA256:", sha256publickey)
// // // step 3: perform ripemd-160 hashing on the result of SHA-256
// const ripemd160publickey = createHash('rmd160').update(sha256publickey).digest()
// // // step 4: add version byte in front of RIPEMD-160 hash (0x00 for mainnet, 0x6f for testnet)
// const versionbytepublickey = Buffer.allocUnsafe(21)
// versionbytepublickey.writeUInt8(0x6f, 0)
// ripemd160publickey.copy(versionbytepublickey, 1)
// // step 5: perform sha-256 hash on the extended ripemd-160 as the result
// // const firsthash = createHash('sha256').update(ripemd160publickey).digest()
// // console.log("FIRST HASH:", firsthash)
// // // step 6: perform sha-256 hash again on the result of the last hashing
// // const secondhash = createHash('sha256').update(firsthash).digest()
// // console.log("SECOND HASH:", secondhash)
// // // step 7: take the first 4 bytes of the second SHA-256 hash. This is the address checksum 
// // const firstfourbytes = secondhash.slice(0, 4)
// // console.log("first four bytes:", firstfourbytes)
// // // step 8: add the checksum from step 7 to the end of extended RIPEMD-160 hash from stage 4. This is the 25-byte binary Bitcoin Address.
// // console.log("TO ADD TO:", ripemd160publickey)
// // const added = Buffer.concat([ripemd160publickey, firstfourbytes])
// // console.log(added)
// // step 9: convert the result to a base58 string using Base58Check
// const base58 = bs58check.encode(versionbytepublickey)
// console.log("the base58:", base58)

// // const step9 = bs58check.encode(versionbytepublickey)
// // console.log('base58check:'. step9)
// // next is Base58Check encoding
































































// const bitGoUTXO = require('bitgo-utxo-lib');
// const zecTestNetwork = bitGoUTXO.networks.zcash;
// var fs = require('fs')


// function zSign(txData, privateKey){

//     let data = JSON.parse(txData)

//     //setting version to sapling
//     const builder = new bitGoUTXO.TransactionBuilder(zecTestNetwork)
//     builder.setVersion(bitGoUTXO.Transaction.ZCASH_SAPLING_VERSION);
//     builder.setVersionGroupId(parseInt('0x892F2085', 16))

//     let utxoTotal = 0

//     data.InputUTXOs.map(utxo =>{
//         builder.addInput(utxo.Tx_hash, utxo.Tx_pos)
//         utxoTotal += utxo.Value
//     })


//     //address used with mnemonic found below. otherwise data.ToAddress
//     builder.addOutput('t1b8bGXJMAMTCJW1kre9mCRCFkfqsb5y3D6', data.SendAmt)
//     builder.addOutput(data.ChgAddress, utxoTotal - (data.SendAmt + data.Fee))


//     const keyPair = bitGoUTXO.ECPair.fromWIF(privateKey, zecTestNetwork)

//     builder.sign(0, keyPair, '', bitGoUTXO.Transaction.SIGHASH_SINGLE, utxoTotal)
//     let signedTx = builder.build()
//     console.log(signedTx.toHex())

// }



// passing transaction data in
// let txData = fs.readFileSync('./ZCash.Transaction.json', function (err, data) {
//     if (err) return console.error(err);
//    return data;
// });

// address level private key 

// zSign(txData, 'L5VBW6kn8QnVZS1FrVdeDfb4zWk11SLjqNKeM1zdrHSmnv9PFYs3')


// october hazard fiscal zoo fly dignity crystal alter quit vehicle swift episode excess charge champion spike orphan leg beauty wisdom exchange certain slam okay




































// const bitGoUTXO = require('bitgo-utxo-lib')

// import { HDNode, Transaction } from 'bitgo-utxo-lib';

// const prikey = ""
// const accountExtendedPublicKey = "xprv9xygbaBCKiDA2Lwbi4n3Q1Z5eckRjhUPyNeKrVHD7tDuSw7twoPdXYLcCTHH6U9uTQDQeHCmkG2S76F5bdGxHnTsTscwk3dNTX7DvikwTFz"
// const InputUTXOs = [
//     {
//       "Tx_hash": "56440fb4224ea997d833374c3412355c8f38b01410c71b9d49fee279a8c35fd4",
//       "Tx_pos": 0,
//       "Height": 411512,
//       "Value": 5271881,
//       "Address": "t1b9NDripdRZMWazHS3HjGyMrWpPrCRwp2i",
//       "KeyHash": "02d67529dea30748236f0836fc4b190f8b4c137ae480cf7e094c3c2746e7de1bd5",
//       "AddrType": 1,
//       "AddrIndex": 13,
//       "tmp": null
//     }
//   ]

// const Json = {
//     "TxId": 1347,
//     "SendAmt": 100000,
//     "Fee": 13633,
//     "GasPrice": 0,
//     "Nonce": 0,
//     "GasLimit": 0,
//     "ExtPublicKey": "xpub6By315i6A5mTEq24p6K3m9VpCeav9ACFLbZvesgpgDktKjT3VLht5Lf63jnUiswEazz4BLCE7T2CbdA28sBKwgzs3E2Ecba5D4aykJ54RYk",
//     "CoinType": "ZEC",
//     "FromAddress": null,
//     "ToAddress": "ZS+knDc0On3/3y/Cn5Me3VnFzK77PKNH8Kd6Eo0RD/na6xx6ClOwwio+6mCSty9Gn0FmQQGx3URCKpQqNAWLAsP8sxuoIl31buqr8ViE5M2KX8lSxwSikS6BE5c4uZ906OaDg8ifodenmYKvrjnwNRlyUlsghm1I4Xs8pW44F+bUaYFiy0gW1J0ELAtcsm+MMQo6jtsQmG1PahIi2Mf0YhYcxFbopiW90twFTDyIkZFz8A4LwnM6uSeJh0e24f6cimb6Y6k3vHgjna1iJWhwkt2rmT/iZsyvhds11DhlRC5iABvdPUb6Xw7DmsKQFZtxoCCrBu4R8J77AbIJlOe/Pg==",
//     "ChgAddress": "t1fCMmWVN4o9v75weMTGQYuN22ZcbQ8BSST",
//     "Contract": null,
//     "Decimal": 0,
//     "InputUTXOs": [
//       {
//         "Tx_hash": "56440fb4224ea997d833374c3412355c8f38b01410c71b9d49fee279a8c35fd4",
//         "Tx_pos": 0,
//         "Height": 411512,
//         "Value": 5271881,
//         "Address": "t1b9NDripdRZMWazHS3HjGyMrWpPrCRwp2i",
//         "KeyHash": "02d67529dea30748236f0836fc4b190f8b4c137ae480cf7e094c3c2746e7de1bd5",
//         "AddrType": 1,
//         "AddrIndex": 13,
//         "tmp": null
//       }
//     ],
//     "Params": null,
//     "TX": null,
//     "Flags": 0,
//     "Sequence": 0,
//     "LastLedgerSequence": 0,
//     "DestinationTag": null,
//     "TransactionType": null,
//     "Testnet": false,
//     "Mocknet": false
//   }


// function signTx() {
//     console.log(HDNode)

// }

// signTx();

























// const bip39 = require("bip39");
// const bip32 = require("bip32");


// class Wallet {
//     constructor(){
//         this.mnemonic = bip39.generateMnemonic(256)
//         this.seed = bip39.mnemonicToSeed(this.mnemonic)
//         this.masterNode = bip32.fromSeed(this.seed)
//     }
// }

// const walletBuild = new Wallet()

// console.log(walletBuild)

// const { pubKeyToAddress } = require('@cobo/crypto-address')
// const fs = require('fs')
// const { USBAdapter } = require('../adapters/USBAdapter')

// this.name = name;
// this.accounts = [];
// this.coinType = 60;
// console.log(pubKeyToAddress)
// if (input==''){
//     this.mnemonic = bip39.generateMnemonic(256);
//     this.seed = bip39.mnemonicToSeed(this.mnemonic);
//     this.rootNode = bip32.fromSeed(this.seed);
//     this.rootKey = this.rootNode.toBase58();
// } else if (input.split(' ').length == 24) {
//     this.mnemonic = input;
//     this.seed = bip39.mnemonicToSeed(this.mnemonic);
//     this.rootNode = bip32.fromSeed(this.seed);
//     this.rootKey = this.rootNode.toBase58();
// }

// /** The following for loop region can be nested further
//  *  in a foreach loop which iterates over an array where each
//  *  index is populated by a coin value ie [0,44,144] where 
//  *  the derivation path forks. account and address mgmt are
//  *  the features that distinguish each coin and are thereby
//  *  where we would seek to extend the parent HDWallet class.
//  */
// for (let i = 0; i<3; i++){
//     this.accounts.push(
//     {
//         aXPrv: this.rootNode.derivePath(`m/44'/${this.coinType}'/${i}'`).toBase58(),
//         aXPub: this.rootNode.derivePath(`m/44'/${this.coinType}'/${i}'`).neutered().toBase58(),
//         address: pubKeyToAddress(this.rootNode.derivePath(`m/44'/${this.coinType}'/${i}'/0/0`).neutered().publicKey.toString('hex'),'ethereum'),
//         priv: this.rootNode.derivePath(`m/44'/${this.coinType}'/${i}'/0/0`).toWIF(),
//         pub: '0x' + this.rootNode.derivePath(`m/44'/${this.coinType}'/${i}'/0/0`).neutered().publicKey.toString('hex')
//     }
// )}
// // this.writeOut();
// console.log(this.getColdAccount())
// }

// new EOSWallet('dingo','eight person fade off border garden ugly borrow rhythm bronze gadget combine tower list bus raven flock ethics adult task galaxy detect tilt envelope');