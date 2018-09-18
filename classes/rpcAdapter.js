const request = require('request')

exports.RPCAdapter = ( () => {
    // returns singleton class of RPC adapter. can be imported
    // via a simple const { RPCAdapter } = require('../classes/RPCAdapter');
    // statement at the head of any file. This provides a fully 
    // instantiated interface (as opposed to a constructor,) 
    // and is useable out of the box. 
    return new class {
        post(method, params=[]) {
            const options = {
                url: "http://18.222.107.97:18332",
                method: 'POST',
                auth: {
                    user: 'btcuser',
                    pass: 'btcpassword'
                },
                body: JSON.stringify({
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