const request = require('request')

function rpcPost(method, params = []) {
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

const promiseLog = (promise) => {
    //Force logging into promised behavior
    promise
        .then((resp) => console.log(resp))
        .catch((err) => console.log(err))
}

promiseLog(rpcPost('getblockchaininfo'))
promiseLog(rpcPost('getwalletinfo'))

module.exports = {
    rpcPost
}