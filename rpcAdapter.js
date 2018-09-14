const Client = require('bitcoin-core')
const client = new Client({ 
    headers: true,
    host: '18.222.107.97', 
    network: 'testnet', 
    username: 'btcuser',
    password: 'btcpassword'
})
    
client.getWalletInfo( (promise) => {
    promise
    .then( (resp) => console.log(resp) )
    .catch( (err) => console.log(err) )
})
const balance = await new Client({ 
    headers: true,
    host: '18.222.107.97', 
    network: 'testnet', 
    username: 'btcuser',
    password: 'btcpassword' 
}).getBalance({
    account: '*',
    minconf: 0
  });
    




// client.getInfo().then((help) => console.log(help));
// client.getbalance()
// console.log('wassssuuuuuup')

//     function(err, body) {
//     if (err) {
//       return console.error(err);
//     }
//     if(body) { (body) => {
//         body.then()
//     }

//     }
//     console.log('Difficulty: ' + difficulty.then();
// })