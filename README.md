# InternTestbed
Testbed for Interns

1. Get invited to the Repo
2. Set up Two Factor Auth
3. Create a personal access token: https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/
4. Install and run the app...

## Installation 
#### Follow these steps to install the repository
``` bash
  git clone https://github.com/10thFloorSoft/InternTestbed2.git InternTestbed2
  npm install
```

## Hello world
#### Getting started.  Try out debugging.. And run from outside VS Code
``` bash
  node index.js
```

## Create a Bitcoin Testnet Address
#### Create an address, then check the result with https://coinomi.com/recovery-phrase-tool.html or https://iancoleman.io/bip39/ 
``` bash
  node bitcoin.js
  mgTaJF2s7x8QdLUN91YGFCg134UwG121io
```
## Demo Notes
#### Our Test Mnemonics:
  Igor:
  Gray: quality chaos left cabbage aware sponsor shop burger urge lottery face glimpse
  Celeste: warfare athlete example bus scissors apology mind noodle glow enemy cement scrub
  Osama: human sun wall return tragic bless detail foot rescue gown deer clerk body certain casual



## DEV NOTES
electrum RPC calls hit port 50001
should the counter be set by the amount of utxos or the last utxo 

(from btctransact)
// n1h4g9FkQe2N68uY5cwQFHcweGhGqSK78v
// wallet.createOrUpdateAccount("column capable stage auto obey twist bring correct crunch act penalty seminar goddess cage inflict pig route fence example cannon fragile puppy actual hedgehog", "true")
// "{\"id\":\"myquery\",\"method\":\"getaddressbalance\",\"params\":[\"14vuRY354EaxDu4WrgjtvoDEwntDNwMVbx\"]}

// "{\"jsonrpc\":\"1.0\",\"id\":\"interns\",\"method\":\"getbalance\",\"params\": [\"\"]   }" 18.222.107.97:50001

// curl --user btcuser:btcpassword --data-binary "{\"jsonrpc\":\"1.0\",\"id\":\"interns\",\"method\":\"blockchain.transaction.get\",\"params\":[\"\"]}" 18.191.234.50:50001

// electrumx_rpc env DB_DIRECTORY=/data/db/ RPC_HOST=0.0.0.0 HOST= TCP_PORT=50001 DAEMON_URL=http://btcuser:btcpassword@127.0.0.1:18332 COIN=BitcoinSegwit NET=testnet /usr/local/bin/electrumx_server.py > ~/electrumx_server.log 2>&1 &


//curl --user btcuser:btcpassword --data-binary {"jsonrpc": "1.0", "id": "interns", "method":"blockchain.transaction.get","params":["fc992bd10bbcbd54ee2279de497ad4bd49ce6a64c27f2a2d3293f761d2a5a3a3"]}


## Dialog for interface 
//hi! what would you like to do?
// create a wallet  |  send money

//***create a wallet***
//what would you like this wallet to be called?
// gets.chomp input equivalent 

//***generate a faucet with a specified amount***
//you have x BTC in your wallet! spend it wisely. use the command BLANK to add x BTC if your funds are too low.

//hi! what would you like to do?
// create a wallet  |  send money

//***send money***
//what is your wallet called?
// gets.chomp input equivalent

//what is the name of the wallet you would like to send money to?
// gets.chomp input equivalent

//your balance is x BTC. How much would you like to send to *string of last input*?
// gets.chomp input equivalent

// how much would you like to pay in miner's fees?
// gets.chomp input equivalent

// With these amounts, you will be left with x BTC in your wallet. Does that sound good to you?
// yes, send!  |  adjust amounts

//**adjust amounts**//
//How much would you like to send to *string of last input*?
// how much would you like to pay in miner's fees?
// gets.chomp input equivalent
// With these amounts, you will be left with x BTC in your wallet. Does that sound good to you?
// yes  |  adjust amounts

//**yes, send!**//
// great! you have send x BTC to *name of recipient wallet.*

//setTimeout to restart?
