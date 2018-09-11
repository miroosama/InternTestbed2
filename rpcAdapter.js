const Client = require('bitcoin-core');
const client = new Client({ 
    host: '18.188.236.212', 
    network: 'testnet', 
    username: 'ubuntu'
 });

client.getInfo().then((help) => console.log(help));