// const electron = window.require('electron');
// const remote = electron.remote;
const bitcoin = require('bitcoinjs-lib');
const eosUtil = require('eosjs-ecc');
var bip39 = require('bip39');
var os = require("os");
const fs = require('fs')

let eos = require('@cobo/eos')



var request = require("request");

class EOSBlockchain{


    getAccount(name){

        let params = JSON.stringify({account_name:`${name}`})
        var options = { method: 'POST', body: [`${params}`],
        url: `https://api.jungle.alohaeos.com/v1/chain/get_account`};

        request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        });

    }

    pushTx(sig, tx){
        let params = JSON.stringify({
            signatures:`${sig}`,
            compressioin: false,
            packed_context_free_data: '00',
            packed_trx: tx
        })
        var options = { method: 'POST', body: [`${params}`],
        url: `https://api.jungle.alohaeos.com/v1/chain/push_transaction`};

        request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        });
    }

}

let test = new EOSBlockchain
test.getAccount("vew2clol22jm")

// around top shock matter bulk find swap much razor liquid open appear sweet arctic diary wheel little bachelor planet lecture address soldier track inmate
// EOS6xfD5383TbpfqkHBKDoyH7yCSKB1DuhGPhAdcUegka2aLERxCD

// vew2clol22jm

// executed transaction: b96396f960f908d9e0cd14371f717ad496fd9c1f1f3c336f7f2b487bfc78588f 336 bytes 1260 us warn 2018-11-12T19:05:39.827 thread-0 main.cpp:482 print_result ] warning: transaction executed locally, but may not be confirmed by the network yet 

// # eosio <= eosio::newaccount {"creator":"eosio","newact":"vew2clol22jm","owner":{"threshold":1,"keys":[{"key":"EOS6xfD5383TbpfqkH... # eosio <= eosio::buyrambytes {"payer":"eosio","receiver":"vew2clol22jm","bytes":4096} # eosio.token <= eosio.token::transfer {"from":"eosio","to":"eosio.ram","quantity":"0.3057 EOS","memo":"buy ram"} # eosio <= eosio.token::transfer {"from":"eosio","to":"eosio.ram","quantity":"0.3057 EOS","memo":"buy ram"} # eosio.ram <= eosio.token::transfer {"from":"eosio","to":"eosio.ram","quantity":"0.3057 EOS","memo":"buy ram"} # eosio.token <= eosio.token::transfer {"from":"eosio","to":"eosio.ramfee","quantity":"0.0016 EOS","memo":"ram fee"} # eosio <= eosio.token::transfer {"from":"eosio","to":"eosio.ramfee","quantity":"0.0016 EOS","memo":"ram fee"} # eosio.ramfee <= eosio.token::transfer {"from":"eosio","to":"eosio.ramfee","quantity":"0.0016 EOS","memo":"ram fee"} # eosio <= eosio::delegatebw {"from":"eosio","receiver":"vew2clol22jm","stake_net_quantity":"100.0000 EOS","stake_cpu_quantity":"... # eosio.token <= eosio.token::transfer {"from":"eosio","to":"eosio.stake","quantity":"200.0000 EOS","memo":"stake bandwidth"} # eosio <= eosio.token::transfer {"from":"eosio","to":"eosio.stake","quantity":"200.0000 EOS","memo":"stake bandwidth"} # eosio.stake <= eosio.token::transfer {"from":"eosio","to":"eosio.stake","quantity":"200.0000 EOS","memo":"stake bandwidth"}


// executed transaction: 5510c29b229aa969e8d021561a88a9ac989eb7cdfaad6bbdc39a4c47f1e4b5cf 144 bytes 358 us warn 2018-11-12T19:07:20.996 thread-0 main.cpp:482 print_result ] warning: transaction executed locally, but may not be confirmed by the network yet [31mError 3080006: Transaction took too long[0m [33mError Details: deadline exceeded pending console output: [0m 

//     # eosio.token <= eosio.token::transfer {"from":"eosio","to":"vew2clol22jm","quantity":"100.0000 EOS","memo":"Jungle Faucet"} # eosio <= eosio.token::transfer {"from":"eosio","to":"vew2clol22jm","quantity":"100.0000 EOS","memo":"Jungle Faucet"} # vew2clol22jm <= eosio.token::transfer {"from":"eosio","to":"vew2clol22jm","quantity":"100.0000 EOS","memo":"Jungle Faucet"}