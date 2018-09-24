var Telnet = require('telnet-client')
var connection = new Telnet()

// let cmd = "{\"jsonrpc\":\"1.0\",\"id\":\"interns\",\"method\":\"getblockchaininfo\",\"params\": [ ] }"
 
// var params = {
//   host: '18.191.234.50',
//   port: 50001,
//   shellPrompt: '/ # ',
//   timeout: 1500
// }
 

// connection.connect(params)
// .then(function(prompt) {
//   connection.exec(cmd)
//   .then(function(res) {
//     console.log('promises result:', res)
//   })
// }, function(error) {
//   console.log('promises reject:', error)
// })

// 'use strict'
 
// const Telnet = require('telnet-client')
 
// async function run() {
//   let connection = new Telnet()
 
//   let params = {
//     host: '18.191.234.50',
//     port: 50001,
//     shellPrompt: '16.04.3 LTS',
//     timeout: 1500
//   }
 
//   await connection.connect(params)
 
//   let res = await connection.exec("uptime")
//   console.log('async result:', res)
// }
 
// run()

// let cmd = {"id": "1", "method": "server.version", "params": ["3.0.3", "1.1"], "jsonrpc" : "1.0"}
// var Telnet = require('telnet-client')

// function telElectrum(){
// var connection = new Telnet()
 
// var params = {
//   host: '18.191.234.50',
//   port: 50001,
//   shellPrompt: '/ # ',
//   timeout: 15000
//   // removeEcho: 4
// }

// connection.on('ready', function(prompt) {
//     console.log("in here")
//   connection.exec("uptime", function(err, response) {
//     console.log(response)
//   })
// })

// let request = {
//     id: "Intern",
//     params: [`miMP7JSuBAccnBiV1WWxqjvxk1KsutvMZ5`],
//     method: "blockchain.address.get_address"
// }

// connection.send(JSON.stringify(request), (e, r) => {
//     if (e) {
//         reject(e);
//     } else {
//         resolve(JSON.parse(r))
//     }
// });

// connection.on('timeout', function() {
//   console.log('socket timeout!')
//   connection.end()
// })
 
// connection.on('close', function() {
//   console.log('connection closed')
// })
 
// connection.connect(params)

// }
// get references to the required stuff
// var TelnetSocket, net, socket, tSocket;

// net = require("net");

// ({TelnetSocket} = require("telnet-stream"));

// // create a Socket connection
// socket = net.createConnection(50001, "18.191.234.50");

// // decorate the Socket connection as a TelnetSocket
// tSocket = new TelnetSocket(socket);

// // if the socket closes, terminate the program
// tSocket.on("close", function() {
//   return process.exit();
// });

// // if we get any data, display it to stdout
// tSocket.on("data", function(buffer) {
//   return process.stdout.write(buffer.toString("utf8"));
// });

// // {"id": "1", "method": "blockchain.address.get_balance", "params": ["miMP7JSuBAccnBiV1WWxqjvxk1KsutvMZ5"], "jsonrpc" : "1.0"}

// // if the user types anything, send it to the socket
// process.stdin.on("data", function(buffer) {
//   return tSocket.write(buffer.toString("utf8"));
// });

function makeRequest() {
    return new Promise((resolve, reject) => {
        let connection = new Telnet();

        let params = {
            host: '18.191.234.50',
            port: 50001,
            shellPrompt: '/ # ',
            timeout: 15000
        }

        connection.on('error', (err) => console.log(err))

        connection.on('timeout', (res) => {
            console.log('timed out')
            connection.end()
        })

        connection.connect(params)

        resolve(connection)
    })
}

function getData(connection) {
    return new Promise((resolve, reject) => {
        let request = {
            id: "Intern",
            params: [`681faba49c3539db51d870be7cb7f02f452d981895ac4c27f630c361176c8c35`],
            method: "blockchain.scripthash.listunspent"
        }
        connection.send(JSON.stringify(request), (e, r) => {
            if (e) {
                reject(e);
            } else {
                resolve(JSON.parse(r))
            }
        });
    });
}

async function calculateFees() {
    let connection = await makeRequest()
    let balance = await getData(connection)
    // let feeInSatoshis = parseFloat(recommendedFees.result) * 100000000
    // let feePerByte = Math.ceil(feeInSatoshis / 1000)
    connection.end()
    // console.log(feePerByte)
    // return feePerByte
    console.log(balance)
}

calculateFees()