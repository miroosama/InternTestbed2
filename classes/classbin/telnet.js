var Telnet = require('telnet-client')
var connection = new Telnet()

class TelnetAdapter {

 makeRequest() {
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

 getData(connection, params, method) {
    return new Promise((resolve, reject) => {
        let request = {
            id: "Intern",
<<<<<<< HEAD:classes/telnet.js
            params: [`${params}`],
            method: `${method}`
=======
            params: [`681faba49c3539db51d870be7cb7f02f452d981895ac4c27f630c361176c8c35`],
            method: "blockchain.scripthash.listunspent"
>>>>>>> 2271de0abd43e19a3241cd0b7aefc8e2188913ac:classes/classbin/telnet.js
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

async telnetConstructor(method, params) {
    let connection = await this.makeRequest()
    let response = await this.getData(connection, params, method)
    connection.end()
    // console.log(feePerByte)
    // return feePerByte
    // console.log(response)
    return response
}

}

module.exports = TelnetAdapter;