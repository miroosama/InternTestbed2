// const request = require('request')
var request = require('request-stream')

exports.RPCAdapter = (() => {
    // returns singleton instance of RPC adapter. 
    // can be imported via a simple 
    // const { RPCAdapter } = require('../classes/RPCAdapter');
    // statement at the head of any file. 
    return new class {
        post(method, params) {
            const options = {
                url: `http://18.191.234.50:50001`,
                method: 'POST',
                body: JSON.stringify({
                    id: "1",
                    jsonrpc: "1.0",
                    method: method,
                    params: params
                })
            }
            return new Promise((resolve, reject) => {
                request(options, (err, res, body) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(JSON.parse(body).result)
                    }
                })
            })
        }
    }
})()

// {"id": "1", "method": "blockchain.address.get_balance", "params": ["miMP7JSuBAccnBiV1WWxqjvxk1KsutvMZ5"], "jsonrpc" : "1.0"}