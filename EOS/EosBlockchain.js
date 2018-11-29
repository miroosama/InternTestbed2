const bitcoin = require('bitcoinjs-lib');
const eosUtil = require('eosjs-ecc');
var bip39 = require('bip39');
var os = require("os");
const fs = require('fs')
const Eos = require('eosjs');
const axios = require('axios');

// let eos = require('@cobo/eos')



var request = require("request");




class EOSBlockchain{
 constructor(){
    this.config = {
        expireInSeconds: 60,
        broadcast: true,
        debug: false,
        sign: true,
        // mainNet bp endpoint
        httpEndpoint: 'https://api.eosnewyork.io',
    },
    this.accInstance = ""
}


    createInstance(prk, pub, creatorPrv, creator, name){
        const defaultPrivateKey = "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3"; // useraaaaaaaa
        // const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
        let eosConfig = {
          chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca', // Jungle Testnet  http://dev.cryptolions.io:38888/v1/chain/get_info
          keyProvider: creatorPrv, // <----- existing account (active) private key that has ram cpu and bandwidth already purchased
          httpEndpoint: 'http://jungle.cryptolions.io:38888', // jungle testnet
          expireInSeconds: 60,
          broadcast: true,
          debug: true, 
          sign: true
      }
      let eos = Eos(eosConfig)
      this.registerAccount(prk, pub, eos, creator, name)
    }
    
    toEOSAmount(amount, symbol = 'EOS'){
        return (amount / 10000).toFixed(4) + ' ' + symbol
      }

    async registerAccount(prk, pub, eos, creator, name){
        const res = await eos.transaction(tr => {
            tr.newaccount({
                creator: creator,
                name: name,
                owner: pub,
                active: pub
            })
            tr.buyrambytes({
                payer: creator,
                receiver: name,
                bytes:4000
              })
              tr.delegatebw({
                from: creator,
                receiver: name,
                stake_net_quantity: this.toEOSAmount(1000, "EOS"),
                stake_cpu_quantity: this.toEOSAmount(1000, "EOS"),
                transfer: 0
              })
            }, { broadcast: true, sign: true })
        console.log(res)
    }

    async eosTx(){
      const options = {
        authorization: '',
        broadcast: false, 
        sign: false,
      };
      const transaction = await eos.transaction(tr => {
        tr.transfer(from, to, amount, memo);
      },
      options
      );

      const data = transaction.transaction.transaction.actions[0].data;
    }
     
    async pushTx(){
      //import transaction and sig
      const trFinal = await eos.pushTransaction({ compression: 'none', transaction: transaction, signatures: sig })
    }

}



module.exports = EOSBlockchain
//dingomate111
// aXPrv:
//         'xprv9zCDbHEsrRfsJM398rkcSzhjYcANtjcCgRY43cmhppbBQqLwNnxJLTr5hHtjoYCcjj1VieRv9B24a3dPRcWeDeVqQdWZ1puZWxDKgy3dx7G',
//        aXPub:
//         'xpub6DBZznmmgoEAWq7cEtHcp8eU6dzsJCL43eTer1BKPA8AHdg5vLGYtGAZYYqLLKYLWKLVUGTDczF2GSNYXDaoCJZjvFvfME1kb8PDKX2eSQW',
//        priv: '5JVJv6HpZWeeRpuc1AVCVFZEdYFWysUKoGK8QGiFPz2gGHF2Sat',
//        pub: 'EOS5yGnpxp4ZsdnGevEd9yGw2PbJcHWaiU6hsE9tA7mHLvvB1ZDP9' },
//dingomate222
// [ { aXPrv:
//   'xprv9zCDbHEsrRfsJM398rkcSzhjYcANtjcCgRY43cmhppbBQqLwNnxJLTr5hHtjoYCcjj1VieRv9B24a3dPRcWeDeVqQdWZ1puZWxDKgy3dx7G',
//  aXPub:
//   'xpub6DBZznmmgoEAWq7cEtHcp8eU6dzsJCL43eTer1BKPA8AHdg5vLGYtGAZYYqLLKYLWKLVUGTDczF2GSNYXDaoCJZjvFvfME1kb8PDKX2eSQW',
//  priv: '5JVJv6HpZWeeRpuc1AVCVFZEdYFWysUKoGK8QGiFPz2gGHF2Sat',
//  pub: 'EOS5yGnpxp4ZsdnGevEd9yGw2PbJcHWaiU6hsE9tA7mHLvvB1ZDP9' },




// let test = new EOSBlockchain
// test.getAccount("vew2clol22jm")

// around top shock matter bulk find swap much razor liquid open appear sweet arctic diary wheel little bachelor planet lecture address soldier track inmate
// EOS6xfD5383TbpfqkHBKDoyH7yCSKB1DuhGPhAdcUegka2aLERxCD

// vew2clol22jm

// executed transaction: b96396f960f908d9e0cd14371f717ad496fd9c1f1f3c336f7f2b487bfc78588f 336 bytes 1260 us warn 2018-11-12T19:05:39.827 thread-0 main.cpp:482 print_result ] warning: transaction executed locally, but may not be confirmed by the network yet 

// # eosio <= eosio::newaccount {"creator":"eosio","newact":"vew2clol22jm","owner":{"threshold":1,"keys":[{"key":"EOS6xfD5383TbpfqkH... # eosio <= eosio::buyrambytes {"payer":"eosio","receiver":"vew2clol22jm","bytes":4096} # eosio.token <= eosio.token::transfer {"from":"eosio","to":"eosio.ram","quantity":"0.3057 EOS","memo":"buy ram"} # eosio <= eosio.token::transfer {"from":"eosio","to":"eosio.ram","quantity":"0.3057 EOS","memo":"buy ram"} # eosio.ram <= eosio.token::transfer {"from":"eosio","to":"eosio.ram","quantity":"0.3057 EOS","memo":"buy ram"} # eosio.token <= eosio.token::transfer {"from":"eosio","to":"eosio.ramfee","quantity":"0.0016 EOS","memo":"ram fee"} # eosio <= eosio.token::transfer {"from":"eosio","to":"eosio.ramfee","quantity":"0.0016 EOS","memo":"ram fee"} # eosio.ramfee <= eosio.token::transfer {"from":"eosio","to":"eosio.ramfee","quantity":"0.0016 EOS","memo":"ram fee"} # eosio <= eosio::delegatebw {"from":"eosio","receiver":"vew2clol22jm","stake_net_quantity":"100.0000 EOS","stake_cpu_quantity":"... # eosio.token <= eosio.token::transfer {"from":"eosio","to":"eosio.stake","quantity":"200.0000 EOS","memo":"stake bandwidth"} # eosio <= eosio.token::transfer {"from":"eosio","to":"eosio.stake","quantity":"200.0000 EOS","memo":"stake bandwidth"} # eosio.stake <= eosio.token::transfer {"from":"eosio","to":"eosio.stake","quantity":"200.0000 EOS","memo":"stake bandwidth"}


// executed transaction: 5510c29b229aa969e8d021561a88a9ac989eb7cdfaad6bbdc39a4c47f1e4b5cf 144 bytes 358 us warn 2018-11-12T19:07:20.996 thread-0 main.cpp:482 print_result ] warning: transaction executed locally, but may not be confirmed by the network yet [31mError 3080006: Transaction took too long[0m [33mError Details: deadline exceeded pending console output: [0m 

//     # eosio.token <= eosio.token::transfer {"from":"eosio","to":"vew2clol22jm","quantity":"100.0000 EOS","memo":"Jungle Faucet"} # eosio <= eosio.token::transfer {"from":"eosio","to":"vew2clol22jm","quantity":"100.0000 EOS","memo":"Jungle Faucet"} # vew2clol22jm <= eosio.token::transfer {"from":"eosio","to":"vew2clol22jm","quantity":"100.0000 EOS","memo":"Jungle Faucet"}



//  getAccount(name){

//      let params = JSON.stringify({account_name:`${name}`})
//      var options = { method: 'POST', body: [`${params}`],
//      url: `https://api.jungle.alohaeos.com/v1/chain/get_account`};

//      request(options, function (error, response, body) {
//      if (error) throw new Error(error);

//      console.log(body);
//      });

//  }

//  pushTx(sig, tx){
//      let params = JSON.stringify({
//          signatures:`${sig}`,
//          compressioin: false,
//          packed_context_free_data: '00',
//          packed_trx: tx
//      })
//      var options = { method: 'POST', body: [`${params}`],
//      url: `https://api.jungle.alohaeos.com/v1/chain/push_transaction`};

//      request(options, function (error, response, body) {
//      if (error) throw new Error(error);

//      console.log(body);
//      });
//  }


// executed transaction: a9af9d78b848ad89626593b0ed479a5c486791231dfff739366b8638508b7e6d 336 bytes 1618 us warn 2018-11-27T20:00:53.065 thread-0 main.cpp:482 print_result ] warning: transaction executed locally, but may not be confirmed by the network yet 

// # eosio <= eosio::newaccount {"creator":"eosio","newact":"dingomate111","owner":{"threshold":1,"keys":[{"key":"EOS5yGnpxp4ZsdnGev... # eosio <= eosio::buyrambytes {"payer":"eosio","receiver":"dingomate111","bytes":4096} # eosio.token <= eosio.token::transfer {"from":"eosio","to":"eosio.ram","quantity":"0.3134 EOS","memo":"buy ram"} # eosio <= eosio.token::transfer {"from":"eosio","to":"eosio.ram","quantity":"0.3134 EOS","memo":"buy ram"} # eosio.ram <= eosio.token::transfer {"from":"eosio","to":"eosio.ram","quantity":"0.3134 EOS","memo":"buy ram"} # eosio.token <= eosio.token::transfer {"from":"eosio","to":"eosio.ramfee","quantity":"0.0016 EOS","memo":"ram fee"} # eosio <= eosio.token::transfer {"from":"eosio","to":"eosio.ramfee","quantity":"0.0016 EOS","memo":"ram fee"} # eosio.ramfee <= eosio.token::transfer {"from":"eosio","to":"eosio.ramfee","quantity":"0.0016 EOS","memo":"ram fee"} # eosio <= eosio::delegatebw {"from":"eosio","receiver":"dingomate111","stake_net_quantity":"100.0000 EOS","stake_cpu_quantity":"... # eosio.token <= eosio.token::transfer {"from":"eosio","to":"eosio.stake","quantity":"200.0000 EOS","memo":"stake bandwidth"} # eosio <= eosio.token::transfer {"from":"eosio","to":"eosio.stake","quantity":"200.0000 EOS","memo":"stake bandwidth"} # eosio.stake <= eosio.token::transfer {"from":"eosio","to":"eosio.stake","quantity":"200.0000 EOS","memo":"stake bandwidth"}







// signatures:
// [ 'SIG_K1_K8MpvjvSQvpSwsuVUCh6ufjiatTeXutTynWginVn8VXNdVMU8LtSyrRCbXBe1MngVLFSVkAg9btoxhwp97x6Gd4EnhDDMQ' ] },
// transaction_id:
// '3945495f92445705d3c9ff8f3d07db28d5e4d3339ec31e0ad8353259cd7c9bc2',
// processed:
// { id:
// '3945495f92445705d3c9ff8f3d07db28d5e4d3339ec31e0ad8353259cd7c9bc2',
// block_num: 26654343,
// block_time: '2018-11-28T14:52:37.500',
// producer_block_id: null,
// receipt:
// { status: 'executed', cpu_usage_us: 25045, net_usage_words: 42 },
// elapsed: 25045,
// net_usage: 336,
// scheduled: false,
// action_traces: [ [Object], [Object], [Object] ],
// except: null } }

// [ { aXPrv:
//   'xprv9zCDbHEsrRfsJM398rkcSzhjYcANtjcCgRY43cmhppbBQqLwNnxJLTr5hHtjoYCcjj1VieRv9B24a3dPRcWeDeVqQdWZ1puZWxDKgy3dx7G',
//  aXPub:
//   'xpub6DBZznmmgoEAWq7cEtHcp8eU6dzsJCL43eTer1BKPA8AHdg5vLGYtGAZYYqLLKYLWKLVUGTDczF2GSNYXDaoCJZjvFvfME1kb8PDKX2eSQW',
//  priv: '5JVJv6HpZWeeRpuc1AVCVFZEdYFWysUKoGK8QGiFPz2gGHF2Sat',
//  pub: 'EOS5yGnpxp4ZsdnGevEd9yGw2PbJcHWaiU6hsE9tA7mHLvvB1ZDP9' },

// async getInfoRefs(prk, pub){
//   const url = 'https://api.eosnewyork.io/v1/chain/'
//   // const url = 'http://jungle.cryptolions.io:18888/v1/chain/'

//   let info = await axios({url: url+'get_info', method: 'post'})
//     .then(function (response) {
//         console.log(response)
//        return response.data.head_block_num
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
//     this.getInfoBlock(prk, info, pub)
// }

// async getInfoBlock(prk, blockNum, pub){
//   const url = 'https://api.eosnewyork.io/v1/chain/'
//   let refBlockPrefix = await axios({url: url+'get_block', method: 'post', data:{block_num_or_id: JSON.stringify(blockNum)} }
//     )
//     .then(function (response) {
//       console.log(response.data)
//       return response.data.ref_block_prefix
//     })
//     .catch(function (error) {
//       console.log(error);
//     });

//     this.createInstance(prk, blockNum, refBlockPrefix, pub)
// }