const request = require('request')

class RPC {

<<<<<<< HEAD
    rpcPost(method, params = []) {
=======
    rpcPost(method, params=[]) {
>>>>>>> 80c19e7aa7862f5628b4a809e94f0f7ad19b1617
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
<<<<<<< HEAD
                    // console.log("MADE IT TO PROM", JSON.parse(body).result, options)
=======
>>>>>>> 80c19e7aa7862f5628b4a809e94f0f7ad19b1617
                }
            })
        })
    }

    promiseLog(promise) {
        //Force logging into promised behavior
        promise
            .then((resp) => console.log(resp))
            .catch((err) => console.log(err))
    }

}
// promiseLog(rpcPost('getblockcount'))
// promiseLog(rpcPost('getblockchaininfo'))

module.exports = RPC;