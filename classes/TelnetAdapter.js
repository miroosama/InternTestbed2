const Telnet = require('telnet-client');

exports.TelnetAdapter = ( () => {
    return class {
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
    
        getData(connection, command, params) {
            return new Promise((resolve, reject) => {
                let request = {
                    id: "Intern",
                    params: [`${params}`]
                }
                request.method = command;
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
            let response = await this.getData(connection, method, params)
            connection.end()
            // console.log(feePerByte)
            // return feePerByte
            // console.log(response)
            return response
        }

    }
})();