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

## NOTES
electrum RPC calls hit port 50001
should the counter be set by the amount of utxos or the last utxo 

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