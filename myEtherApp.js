const EtherTransaction = require('./myEtherTx')
const Wallet = require('./myEther')

// const wallet = new Wallet()
// wallet.createAccount("vitalik is a great guy")

// wallet.displayBalance("0xaa98f82ab403663748e10b6f7256e3c29cdd0051")

const etherTx = new EtherTransaction()

etherTx.buildingTx("0xaa98f82ab403663748e10b6f7256e3c29cdd0051", '0xa51DBF829a695aE1721040752fE80434D8e35E4b', "516690b19c04eeb1c9894ab18b56bfeb291eaaa0574c8bc92096cf3c592d1ff9" )

// transaction completed and gave the following txhash:

//txhash: 0x65daf45b344639fc88bb8f5fc542f123bac6bb87360388ac9cc0432fb05b7408













// { address: '0xa51DBF829a695aE1721040752fE80434D8e35E4b',
//   privateKey:
//    '0x93621d25ecda51cb464fb849c6ea0972ded82e6b6ebb76097d1fc4bab5c3d601',

//tx hash from metamask faucet
// 0xc5e119a51711434a5b5ec04c6ad39ced75a6fb49f1d79db97c0e2530c5ac426e

// 0x81b7e08f65bdf5648606c89998a9cc8164397647

// To:  0xaa98f82ab403663748e10b6f7256e3c29cdd0051