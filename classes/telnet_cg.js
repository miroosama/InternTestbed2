//npm install telnet-client
//npm install -g telnet -client

'use strict'

const Telnet = require('telnet-client')

async function run() {
    let connection = new Telnet()

    let params = {
        host: '127.0.0.1',
        port: 18332,
        shellPrompt: '/#',
        timeout: 1500
    }

    await connection.connect(params)

    let res = await connection.exec('uptime')
    console.log('asynce result:', res)
}

run()
