// const electron = window.require('electron');
// const remote = electron.remote;
const bitcoin = require('bitcoinjs-lib');
const eosUtil = require('eosjs-ecc');
var bip39 = require('bip39');
var os = require("os");
const fs = require('fs')

let eos = require('@cobo/eos')



var request = require("request");

function eosBlockchain(action){
let params = JSON.stringify({account_name:"gqztenjzgege"})
var options = { method: 'POST', body: [`${params}`],
  url: `https://api.eosnewyork.io/v1/chain/${action}`};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

}