const Client = require('bitcoin-core');
const client = new Client({
    host: '18.222.107.97',
    network: 'testnet',
    username: 'btcuser',
    password: 'btcpassword'
});

client.getWalletInfo((promise) => {
    (promise)
    .then((resp) => console.log(resp))
        .catch((error) => console.log(error))
})

client.getInfo().then((help) => console.log(help));

client.getDifficulty(function (err, difficulty) {
    if (err) {
        return console.error(err);
    }

    console.log('Difficulty: ' + difficulty);
});

// client.getInfo().then((help) => console.log(help));