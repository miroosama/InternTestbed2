#!/usr/bin/env node

'use strict';

const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");

const run_bitcoin = require("./bitcoin_ie");

const init = () => {
  console.log(
    chalk.green(
      figlet.textSync("Node f*cking JS", {
        font: "Ghost",
        horizontalLayout: "default",
        verticalLayout: "default"
      })
    )
  );
}

const run = async () => {
  init();
}

const check = async () => {
  console.log(run_bitcoin.balance);
}

check();
// run();

// console.log(run_bitcoin.add(2, 2));
// console.log(run_bitcoin.balance);
// console.log(run_bitcoin.public);
// console.log(run_bitcoin.handler);
// console.log(run_bitcoin.public);
// console.log(run_bitcoin.private);