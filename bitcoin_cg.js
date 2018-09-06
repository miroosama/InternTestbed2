//require bip39, 'mnemonic code for generating deterministic keys' - .generateMnemonic(), mnemonicToSeed()
var bip39 = require('bip39');

//require bitcoin, bip32 is accessible through it (what other bips?)
var bitcoin = require('bitcoinjs-lib');

//require request, it is a way to make HTTP calls
//request( url, function (error, response, body) {
    //can print error, if one occurred
    //response is the status code
    //body is the HTML of the url we are requesting
//}
const request = require('request');

var network = bitcoin.networks.testnet;

//.generateMnemonic() will create a new Mnemonic everytime. this is the beginning of the 'account?' Cannot create a mnemonic on your own, because the last value is a checksum
var mnemonic = 'warfare athlete example bus scissors apology mind noodle glow enemy cement scrub'
//we pass in the mnemonic into bip39.mnemonicToSeed(),
var seed = bip39.mnemonicToSeed(mnemonic);

var root = bitcoin.bip32.fromSeed(seed, network);

const path = "m/44'/1'/0'/0/0"
const node = root.deriveHardened(44).deriveHardened(1).deriveHardened(0).derive(0).derive(0)

function getAddress(node, network) {
    return bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address
}

let addr = 'mgTaJF2s7x8QdLUN91YGFCg134UwG121io'
let apiUrl = 'https://testnet.blockexplorer.com/api/addr/'

//     // log unspent transactions -- account as it stands
// request.get(apiUrl + addr + '/utxo', (err, req, body) => {
//     console.log(JSON.parse(body))
//    }
//   );

// // log balance
// request.get(apiUrl + addr + '/balance', (err, req, body) => {
//   console.log(JSON.parse(body))
//  }
// );

// [ { address: 'mgTaJF2s7x8QdLUN91YGFCg134UwG121io',
//     txid:
//      '107be8e4c1031b1527a4fd518a25e394a12f13245a41436db10612020271a672',
//     vout: 0,
//     scriptPubKey: '76a9140a5484149c950916a10776c1801fc7fdca87dc8188ac',
//     amount: 0.000018,
//     satoshis: 1800,
//     height: 1412433,
//     confirmations: 82 },
//   { address: 'mgTaJF2s7x8QdLUN91YGFCg134UwG121io',
//     txid:
//      'de175e7ff9969a0dd5f5df6be1aaf2c9ccfd958f4d6bd3873222f0ce170c7de6',
//     vout: 0,
//     scriptPubKey: '76a9140a5484149c950916a10776c1801fc7fdca87dc8188ac',
//     amount: 0.000016,
//     satoshis: 1600,
//     height: 1412429,
//     confirmations: 86 },
//   { address: 'mgTaJF2s7x8QdLUN91YGFCg134UwG121io',
//     txid:
//      '43b75e8a7bd8a1a5aa51e94395b9fd1ff7019d691130609bf19d0d7d2bce61f8',
//     vout: 1,
//     scriptPubKey: '76a9140a5484149c950916a10776c1801fc7fdca87dc8188ac',
//     amount: 0.00002009,
//     satoshis: 2009,
//     height: 1412423,
//     confirmations: 92 },
//   { address: 'mgTaJF2s7x8QdLUN91YGFCg134UwG121io',
//     txid:
//      'f9acfccbee92232f20f2bd9e08ff096a40ea4cd500c7b3f7afbd03b37ed603a8',
//     vout: 0,
//     scriptPubKey: '76a9140a5484149c950916a10776c1801fc7fdca87dc8188ac',
//     amount: 0.000018,
//     satoshis: 1800,
//     height: 1412423,
//     confirmations: 92 },
//   { address: 'mgTaJF2s7x8QdLUN91YGFCg134UwG121io',
//     txid:
//      '246041dea3d987adeafe3718426c6679d44b4c055a6f153c0b33da56536a2084',
//     vout: 1,
//     scriptPubKey: '76a9140a5484149c950916a10776c1801fc7fdca87dc8188ac',
//     amount: 0.00001798,
//     satoshis: 1798,
//     height: 1412423,
//     confirmations: 92 },
//   { address: 'mgTaJF2s7x8QdLUN91YGFCg134UwG121io',
//     txid:
//      'd3b9e066894abb4e3cbf53890fb131ed9977126afb079f64db5efbb2aac0817b',
//     vout: 1,
//     scriptPubKey: '76a9140a5484149c950916a10776c1801fc7fdca87dc8188ac',
//     amount: 0.00001907,
//     satoshis: 1907,
//     height: 1412423,
//     confirmations: 92 },
//   { address: 'mgTaJF2s7x8QdLUN91YGFCg134UwG121io',
//     txid:
//      '2b8f270de0730f6687064c218f8845f18e2c1e4e26266b62ca611353928988ab',
//     vout: 0,
//     scriptPubKey: '76a9140a5484149c950916a10776c1801fc7fdca87dc8188ac',
//     amount: 0.00187,
//     satoshis: 187000,
//     height: 1412422,
//     confirmations: 93 },
//   { address: 'mgTaJF2s7x8QdLUN91YGFCg134UwG121io',
//     txid:
//      '6fe19b1f8375f62148b081bc3e28f3c16dd4f965fbb49ad4a81aa224766bfa69',
//     vout: 1,
//     scriptPubKey: '76a9140a5484149c950916a10776c1801fc7fdca87dc8188ac',
//     amount: 0.000019,
//     satoshis: 1900,
//     height: 1412422,
//     confirmations: 93 } ]


    // { txid: '107be8e4c1031b1527a4fd518a25e394a12f13245a41436db10612020271a672',
    // vout: 0,
    // satoshis: 1800 }

    let tx = new bitcoin.TransactionBuilder(network);
    let input1 = 'f9acfccbee92232f20f2bd9e08ff096a40ea4cd500c7b3f7afbd03b37ed603a8'
    //1800 satoshis
    let input2 = 'd3b9e066894abb4e3cbf53890fb131ed9977126afb079f64db5efbb2aac0817b';
    //1907 satoshis

    let amountWeHave = 1907
    let amountToKeep = 1500
    let transactionFee = 100

    let amountToSend = amountWeHave - amountToKeep - transactionFee

    //input
    tx.addInput(t4, 0); 

    //output
    tx.addOutput("msTeEpLKa4dKbFj5WUQ962Tu7bWyQjM6wS", amountToSend);
    tx.addOutput("mgTaJF2s7x8QdLUN91YGFCg134UwG121io", amountToKeep);

    let WIF = node.toWIF()
    let signature = bitcoin.ECPair.fromWIF(WIF, network);
    
    tx.sign(0, signature)

    let transaction = tx.build()
    let txhex = transaction.toHex();


    console.log('our beautiful transaction:', txhex)

    // request({
    //     url: 'https://testnet.blockexplorer.com/api/tx/send',
    //     method: "POST",
    //     json: true,
    //     body: `${txhex}`
    // }, function (error, response, body){
    //     console.log(response);
    // });











// function getPublicKey(node){
//     return node.publicKey.hexSlice()
// }



