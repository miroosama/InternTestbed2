const Client = require('bitcoin-core');
var RpcClient = require('bitcoind-rpc');
var async = require("async");
var await = require('asyncawait/await')
const axios = require('axios')
const request = require('request')
// var config = {
//     user: 'btcuser',
//     pass: 'btcpassword',
//     host: '18.222.107.97', 
//     network: 'testnet',
//     port: '18332',
//   };
// const client = new Client({ 
//     headers: false,
//     version: '0.15.1',
//     host: '18.222.107.97', 
//     network: 'testnet', 
//     username: 'btcuser',
//     password: 'btcpassword',
//     port: '18332',
//     timeout: 30000
//  });
// client.getBlockchainInformation()

//  client.getBalance('*', 6, function(err, balance, resHeaders) {
//     if (err) return console.log(err);
//     console.log('Balance:', balance);
//   });

//  var rpc = new RpcClient(config);
//  console.log(rpc)
//  function showNewTransactions() {
//     rpc.getRawMemPool(function (err, ret) {
//       if (err) {
//         console.error(err);
//         return setTimeout(showNewTransactions, 10000);
//       }
//     })
// }

//       showNewTransactions()
//  client.getDifficulty(function(err, difficulty) {
//     if (err) {
//       return console.error(err);
//     }
//     console.log('Difficulty: ' + difficulty)
// })

//     console.log('Difficulty: ' + difficulty);
//   });



// const balance = await new Client({ 
//      headers: false,
//     version: '0.15.1',
//     host: '18.222.107.97', 
//     network: 'testnet', 
//     username: 'btcuser',
//     password: 'btcpassword',
//     port: '18333',
//     timeout: 30000 }).getInfo().then((help) => console.log(help))
// axios.get('http://18.222.107.97/', config).then(function(response) {
//     console.log(response);
//   }).catch(function(error){
//       console.log(error)
//   });
//   var config = {
//     network: 'testnet', 
//     port: 18332,
//     username: 'btcuser',
//     password: 'btcpassword'
// }

// axios.get('http://18.222.107.97/', config)
//   .then(function(response) {
//     console.log(response)
//   }).catch(function(error){
//       console.log(error)
//   });

// axios.post({
//     data:{
//     host: '18.222.107.97', 
//     network: 'testnet', 
//     username: 'btcuser',
//     password: 'btcpassword',
//     port: 18332,
//     timeout: 30000
//     }
//   }).then(function(response) {
//     console.log(response);
//   })  .catch(function (error) {
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       console.log(error.response.data);
//       console.log(error.response.status);
//       console.log(error.response.headers);
//     } else if (error.request) {
//       // The request was made but no response was received
//       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//       // http.ClientRequest in node.js
//       console.log("HHHEEEEEEEEELLLPPPPPP", error.request);
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.log('Error', error.message);
//     }
//     console.log(error.config);
//   });

  //curl --user 'bitcoinrpc' --data-binary '{"jsonrpc":"1.0","id":"curltext","method":"getinfo","params":[]}' -H 'content-type:text/plain;' http://18.222.107.97:18332
// let body = {
//     jsonrpc: "1.0",
//     method: "getblockchaininfo",
//     id: "interns",
//     params: "[]",
//     auth: {
//                 user: "btcuser",
//                 pass: "btcpassword"
//             }
// }

// headers = {
//     'User-Agent': 'Super Agent/0.0.1',
//     "Content-Type": "application/json",
//     "Accept": 'application/json'
//         }

// axios.post('http://18.222.107.97:18332', body, headers).then(function(response) {
//     console.log(response);
//   }).catch(function(error){
//       console.log(error)
//   });

//   axios.post('http://18.222.107.97:18332', {
//     data: JSON.stringify(body)}, { 
//     config: {
//     auth: {
//         username: "btcuser",
//         password: "btcpassword"
//     }, 
//       headers: {
//         username: "btcuser",
//         password: "btcpassword",
//         'User-Agent': 'Super Agent/0.0.1',
//         "Content-Type": "application/json",
//         "Accept": 'application/json'
//             }
//         }
//     }).then(function(response) {
//     console.log(response);
//   }).catch(function(error){
//       console.log(error)
//   });

//   let headers = {
//     "Content-Type": "application/json",
//     "Accept": 'application/json'
//   }

//   var options = {
//     url: "http://18.222.107.97:18332",
//     method: 'POST',
//     headers: headers,
//     body: JSON.stringify({
//       jsonrpc: '1.0',
//       method: 'getblockchaininfo',
//       params: [],
//       id: "interns"
//     })
//   }

//   request(options, function (error, res, body){console.log(body, error, res)});






//curl --user btcuser --pass btcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "createrawtransaction", "params": ["[{"txid":"966aa228397a9968894165d9adad2ced2d9492a178e6cd76401518dc2bfc5a5d", "vout":0}]","{"n1h4g9FkQe2N68uY5cwQFHcweGhGqSK78v":0.000009}"]}' -H 'content-type: text/plain;' 127.0.0.1:18332


const headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/json-rpc',
    'Accept':'application/json-rpc'
}

const options = {
    url: "http://18.222.107.97:18332",
    method: 'POST',
    auth: {user:'btcuser',pass:'btcpassword'},
    headers: headers,
    body: JSON.stringify({jsonrpc: "1.0", method: "getblockchaininfo", params: []})
}

function rpcPost(method, params = []) {
    const options = {
        url: "http://18.222.107.97:18332",
        method: 'POST',
        auth: {user:'btcuser',pass:'btcpassword'},
        headers: headers,
        body: JSON.stringify({jsonrpc: "1.0", method: method, params: params})
    }
    return new Promise( (resolve, reject) => {
        request(options, (err,res,body) => {
            if (err) {
                reject(err)
            } else {
                resolve(JSON.parse(body).result)
            }
        })
    })
}

const promiseLog = (promise) => {
    //Force logging into promised behavior
    promise
    .then( (resp) => console.log(resp) )
    .catch( (err) => console.log(err) )    
}

promiseLog(rpcPost('getblockchaininfo'))
promiseLog(rpcPost('getwalletinfo'))