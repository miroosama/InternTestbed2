
exports.TelnetAdapter = ( () => {
    // returns singleton instance of TelnetAdapter. 
    // can be imported via a simple 
    // const { TelnetAdapter } = require('../classes/TelnetAdapter');
    // statement at the head of any file. 
    return new class {
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
    
        getData(connection, endpoint, params) {
            return new Promise((resolve, reject) => {
                let request = {
                    id: "Intern",
                    params: [`${params}`]
                }
                request.method = endpoint === "estimatefee" ? 'blockchain.estimatefee' : `blockchain.address.${endpoint}`;
                connection.send(JSON.stringify(request), (e, r) => {
                    if (e) {
                        reject(e);
                    } else {
                        resolve(JSON.parse(r))
                    }
                });
            });
        }
    }
})()