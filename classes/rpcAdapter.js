const request = require('request')

exports.RPCAdapter = ( () => {
    // returns singleton instance of RPC adapter. 
    // can be imported via a simple 
    // const { RPCAdapter } = require('../classes/RPCAdapter');
    // statement at the head of any file. 
    return new class {
        post(method, params=[], port) {
            const options = {
                url: `http://18.222.107.97:${port}`,
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