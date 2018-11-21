const bitGoUTXO = require('bitgo-utxo-lib');
const bip32 = require("bip32");
const zecTestNetwork = bitGoUTXO.networks.zcash;
var fs = require('fs')


function zSign(txData, extPrivateKey){

    let data = JSON.parse(txData)

    //setting version to sapling
    const builder = new bitGoUTXO.TransactionBuilder(zecTestNetwork)
    builder.setVersion(bitGoUTXO.Transaction.ZCASH_SAPLING_VERSION);
    builder.setVersionGroupId(parseInt('0x892F2085', 16))

    let utxoTotal = 0
    let keyPairs = []
    data.InputUTXOs.map(utxo =>{
        builder.addInput(utxo.Tx_hash, utxo.Tx_pos)
        utxoTotal += utxo.Value
        const t = bip32.fromBase58(extPrivateKey, zecTestNetwork);
        const derivedIndex = `${utxo.AddrType}/${utxo.AddrIndex}`;
        const wifKey = t.derivePath(derivedIndex).toWIF();
        const keyPair = bitGoUTXO.ECPair.fromWIF(wifKey, zecTestNetwork)
        keyPairs.push(keyPair)
    })
    //address used with mnemonic found below. otherwise data.ToAddress
    builder.addOutput('t1b8bGXJMAMTCJW1kre9mCRCFkfqsb5y3D6', data.SendAmt)
    builder.addOutput(data.ChgAddress, utxoTotal - (data.SendAmt + data.Fee))

    keyPairs.map(keyP => {
        builder.sign(0, keyP, '', bitGoUTXO.Transaction.SIGHASH_SINGLE, utxoTotal)
    })
    
    let signedTx = builder.build()
    console.log(signedTx.toHex())

}


// passing transaction data in
// let txData = fs.readFileSync('./ZCash.Transaction.json', function (err, data) {
//     if (err) return console.error(err);
//    return data;
// });

zSign(txData, 'xprv9xygbaBCKiDA2Lwbi4n3Q1Z5eckRjhUPyNeKrVHD7tDuSw7twoPdXYLcCTHH6U9uTQDQeHCmkG2S76F5bdGxHnTsTscwk3dNTX7DvikwTFz')


// october hazard fiscal zoo fly dignity crystal alter quit vehicle swift episode excess charge champion spike orphan leg beauty wisdom exchange certain slam okay