// const electron = window.require('electron');
// const remote = electron.remote;
const bitcoin = require('bitcoinjs-lib');
const eosUtil = require('eosjs-ecc');
var bip39 = require('bip39');
var os = require("os");
const fs = require('fs')
const Eos = require('eosjs');
const axios = require('axios');
const { Api, JsonRpc, RpcError, JsSignatureProvider } = require('eosjs');
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

    async getInfoRefs(prk, pub){
        const url = 'https://api.eosnewyork.io/v1/chain/'
        // const url = 'http://jungle.cryptolions.io:18888/v1/chain/'
 
        let info = await axios({url: url+'get_info', method: 'post'})
          .then(function (response) {
              console.log(response)
             return response.data.head_block_num
          })
          .catch(function (error) {
            console.log(error);
          });
          this.getInfoBlock(prk, info, pub)
    }

    async getInfoBlock(prk, blockNum, pub){
        const url = 'https://api.eosnewyork.io/v1/chain/'
        let refBlockPrefix = await axios({url: url+'get_block', method: 'post', data:{block_num_or_id: JSON.stringify(blockNum)} }
          )
          .then(function (response) {
            console.log(response.data)
            return response.data.ref_block_prefix
          })
          .catch(function (error) {
            console.log(error);
          });

          this.createInstance(prk, blockNum, refBlockPrefix, pub)
    }

    createInstance(prk, blockNum, ref_block_prefix, pub){
        // let newB = blockNum.toString().slice(0, 4)
        // let newb1 = parseInt(newB, 10)
        // console.log(newb1)
        // const time = new Date().getTime()
        // const expiration =  new Date(time + 60000).toISOString().split('.')[0]
        // console.log(expiration)
        // const headers = {
        //   expiration: expiration,
        //   ref_block_num: 1,
        //   ref_block_prefix: ref_block_prefix
        // }
        // const client = eos({
        //   keyProvider: "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3",
        //   transactionHeaders: (expireInSeconds, callback) => callback(null, headers),
        //   broadcast: true,
        //   sign: true,
        //   httpEndpoint: 'https://api.eosnewyork.io',
        //   expireInSeconds: 60
        // })
        // this.accInstance = client
        // this.registerAccount(prk, pub)
        const defaultPrivateKey = "5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr"; // useraaaaaaaa
        const signatureProvider = new JsSignatureProvider("5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr");
        let eosConfig = {
          chainId: this._chainId, // Jungle Testnet  http://dev.cryptolions.io:38888/v1/chain/get_info
          keyProvider: signatureProvider, // <----- existing account (active) private key that has ram cpu and bandwidth already purchased
          httpEndpoint: 'https://api.eosnewyork.io', // jungle testnet
          expireInSeconds: 60,
          broadcast: true,
          debug: true, 
          sign: true
      }
      let eos = Eos(eosConfig)
      this.registerAccount(prk, pub, eos)
    }
    
    toEOSAmount(amount, symbol = 'EOS'){
        return (amount / 10000).toFixed(4) + ' ' + symbol
      }

    async registerAccount(prk, pub, eos){
        const res = await eos.transaction(tr => {
            tr.newaccount({
                creator: 'eosio',
                name: "dingomate",
                owner: pub,
                active: pub
            })
            tr.buyrambytes({
                payer: 'eosio',
                receiver: 'dingomate',
                bytes:4000
              })
              tr.delegatebw({
                from: 'eosio',
                receiver: "dingomate",
                stake_net_quantity: this.toEOSAmount(1000, "EOS"),
                stake_cpu_quantity: this.toEOSAmount(1000, "EOS"),
                transfer: 0
              })
            }, { broadcast: true, sign: true })
        console.log(res)
    }

}


module.exports = EOSBlockchain






// let test = new EOSBlockchain
// test.getAccount("vew2clol22jm")

// around top shock matter bulk find swap much razor liquid open appear sweet arctic diary wheel little bachelor planet lecture address soldier track inmate
// EOS6xfD5383TbpfqkHBKDoyH7yCSKB1DuhGPhAdcUegka2aLERxCD

// vew2clol22jm

// executed transaction: b96396f960f908d9e0cd14371f717ad496fd9c1f1f3c336f7f2b487bfc78588f 336 bytes 1260 us warn 2018-11-12T19:05:39.827 thread-0 main.cpp:482 print_result ] warning: transaction executed locally, but may not be confirmed by the network yet 

// # eosio <= eosio::newaccount {"creator":"eosio","newact":"vew2clol22jm","owner":{"threshold":1,"keys":[{"key":"EOS6xfD5383TbpfqkH... # eosio <= eosio::buyrambytes {"payer":"eosio","receiver":"vew2clol22jm","bytes":4096} # eosio.token <= eosio.token::transfer {"from":"eosio","to":"eosio.ram","quantity":"0.3057 EOS","memo":"buy ram"} # eosio <= eosio.token::transfer {"from":"eosio","to":"eosio.ram","quantity":"0.3057 EOS","memo":"buy ram"} # eosio.ram <= eosio.token::transfer {"from":"eosio","to":"eosio.ram","quantity":"0.3057 EOS","memo":"buy ram"} # eosio.token <= eosio.token::transfer {"from":"eosio","to":"eosio.ramfee","quantity":"0.0016 EOS","memo":"ram fee"} # eosio <= eosio.token::transfer {"from":"eosio","to":"eosio.ramfee","quantity":"0.0016 EOS","memo":"ram fee"} # eosio.ramfee <= eosio.token::transfer {"from":"eosio","to":"eosio.ramfee","quantity":"0.0016 EOS","memo":"ram fee"} # eosio <= eosio::delegatebw {"from":"eosio","receiver":"vew2clol22jm","stake_net_quantity":"100.0000 EOS","stake_cpu_quantity":"... # eosio.token <= eosio.token::transfer {"from":"eosio","to":"eosio.stake","quantity":"200.0000 EOS","memo":"stake bandwidth"} # eosio <= eosio.token::transfer {"from":"eosio","to":"eosio.stake","quantity":"200.0000 EOS","memo":"stake bandwidth"} # eosio.stake <= eosio.token::transfer {"from":"eosio","to":"eosio.stake","quantity":"200.0000 EOS","memo":"stake bandwidth"}


// executed transaction: 5510c29b229aa969e8d021561a88a9ac989eb7cdfaad6bbdc39a4c47f1e4b5cf 144 bytes 358 us warn 2018-11-12T19:07:20.996 thread-0 main.cpp:482 print_result ] warning: transaction executed locally, but may not be confirmed by the network yet [31mError 3080006: Transaction took too long[0m [33mError Details: deadline exceeded pending console output: [0m 

//     # eosio.token <= eosio.token::transfer {"from":"eosio","to":"vew2clol22jm","quantity":"100.0000 EOS","memo":"Jungle Faucet"} # eosio <= eosio.token::transfer {"from":"eosio","to":"vew2clol22jm","quantity":"100.0000 EOS","memo":"Jungle Faucet"} # vew2clol22jm <= eosio.token::transfer {"from":"eosio","to":"vew2clol22jm","quantity":"100.0000 EOS","memo":"Jungle Faucet"}



// this.config = {
//     expireInSeconds: 60,
//     broadcast: true,
//     debug: false,
//     sign: true,
//     // mainNet bp endpoint
//     httpEndpoint: 'https://api.eosnewyork.io',
// },

// async getIn(){
//     let chainInfo = await this.ceos.getInfo((error, info) => {
//      // console.log(error, info);
//      // this.config.lastBlockNum = info.last_irreversible_block_num
//      return info
//  })
//  return chainInfo
// }

//  async getR(){
//      let h = await this.getIn()
//      console.log(h)
//  }
//  getBl(){
//      this.eos.getBlock("26760602", (error, info) => {
//          console.log(error, info);
//      });
//  }


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


//  async getInfo(){
//      var options = { method: 'POST',
//      url: 'https://api.eosnewyork.io/v1/chain/get_info'};

//      let info = await request(options, function (error, response, body) {
//      // console.log(body);
//      let res = JSON.parse(body)
//      return res
//      // console.log(res.last_irreversible_block_num, "break", res.last_irreversible_block_id)
//      })
//      .catch(err => console.log(err));
//      return info
//  }

// maxFreeSockets: 256 },
// socketPath: undefined,
// timeout: undefined,
// method: 'POST',
// path: '/v1/chain/get_info',
// _ended: true,
// res:
//  IncomingMessage {
//    _readableState: [ReadableState],
//    readable: false,
//    _events: [Object],
//    _eventsCount: 3,
//    _maxListeners: undefined,
//    socket: [Socket],
//    connection: [Socket],
//    httpVersionMajor: 1,
//    httpVersionMinor: 1,
//    httpVersion: '1.1',
//    complete: true,
//    headers: [Object],
//    rawHeaders: [Array],
//    trailers: {},
//    rawTrailers: [],
//    aborted: false,
//    upgrade: false,
//    url: '',
//    method: null,
//    statusCode: 200,
//    statusMessage: 'OK',
//    client: [Socket],
//    _consuming: false,
//    _dumped: false,
//    req: [Circular],
//    responseUrl: 'http://18.217.207.243:8888/v1/chain/get_info',
//    redirects: [] },
// aborted: undefined,
// timeoutCb: null,
// upgradeOrConnect: false,
// parser: null,
// maxHeadersCount: null,
// _redirectable:
//  Writable {
//    _writableState: [WritableState],
//    writable: true,
//    _events: [Object],
//    _eventsCount: 2,
//    _maxListeners: undefined,
//    _options: [Object],
//    _redirectCount: 0,
//    _redirects: [],
//    _requestBodyLength: 0,
//    _requestBodyBuffers: [],
//    _onNativeResponse: [Function],
//    _currentRequest: [Circular],
//    _currentUrl: 'http://18.217.207.243:8888/v1/chain/get_info' },
// [Symbol(isCorked)]: false,
// [Symbol(outHeadersKey)]:
//  { accept: [Array],
//    'content-type': [Array],
//    'user-agent': [Array],
//    host: [Array] } },
// data:
// { server_version: '11c25394',
// chain_id:
//  'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
// head_block_num: 1,
// last_irreversible_block_num: 0,
// last_irreversible_block_id:
//  '0000000000000000000000000000000000000000000000000000000000000000',
// head_block_id:
//  '00000001bcf2f448225d099685f14da76803028926af04d2607eafcf609c265c',
// head_block_time: '2018-06-01T12:00:00.000',
// head_block_producer: '',
// virtual_block_cpu_limit: 200000,
// virtual_block_net_limit: 1048576,
// block_cpu_limit: 200000,
// block_net_limit: 1048576,
// server_version_string: 'v1.4.3' } }
// { timestamp: '2018-06-01T12:00:00.000',
// producer: '',
// confirmed: 1,
// previous:
// '0000000000000000000000000000000000000000000000000000000000000000',
// transaction_mroot:
// '0000000000000000000000000000000000000000000000000000000000000000',
// action_mroot:
// 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
// schedule_version: 0,
// new_producers: null,
// header_extensions: [],
// producer_signature:
// 'SIG_K1_111111111111111111111111111111111111111111111111111111111111111116uk5ne',
// transactions: [],
// block_extensions: [],
// id:
// '00000001bcf2f448225d099685f14da76803028926af04d2607eafcf609c265c',
// block_num: 1,
// ref_block_prefix: 2517196066 }
// { transaction_id:
// '540cb804e1797fefbcb5e8051f252fb632de3c8c8e5187f3401f08a5d64878c9',
// broadcast: false,
// transaction:
// { compression: 'none',
// transaction:
//  { expiration: '2018-11-20T17:06:42',
//    ref_block_num: 1,
//    ref_block_prefix: 2517196066,
//    max_net_usage_words: 0,
//    max_cpu_usage_ms: 0,
//    delay_sec: 0,
//    context_free_actions: [],
//    actions: [Array],
//    transaction_extensions: [] },
// signatures:
//  [ 'SIG_K1_KXRP61xviZp5hwoKaY4jUiVDF72Dsgx34LgSzwFkUp92GNCCjmERyA4zvT8yseFMJXup6bgP3qsz2BWjpX23oyKAqKoyhV' ] } }