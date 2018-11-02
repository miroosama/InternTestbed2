const readline = require('readline');
const axios = require('axios');

const rootUrl = "localhost";
// const rootUrl = "devapi.custody.center";
const test_pw = "DefaultPasswordForNow1!";
let jwt = "";
let firm_jwt = "";

// let jwt = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiTmV3bWFuIChQYXJ0bmVyKSBTeXN0ZW0gQWNjb3VudCIsIklwYSI6Ijo6ZmZmZjoxMjcuMC4wLjEiLCJQYXJlbnRDb21wYW55IjoiTmV3bWFuIChQYXJ0bmVyKSIsIlBhaSI6IjEwNTM1NDIzLTkyYzMtNDdiYS1iMGVkLTY1NDZlNmE5YjgxMCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlBhcnRuZXIiLCJVaWQiOiI5MDA4YzU4MS05NjYyLTQ1ZmQtYWJhZi00MmVmZjIzNDRlNGQiLCJuYmYiOjE1NDA5MjkxMjEsImV4cCI6MTY5ODYwOTEyMSwiaXNzIjoiZGlnaXRhbGFzc2V0Y3VzdG9keS5jb20iLCJhdWQiOiJSZWRXaW5nQXVkaWVuY2UifQ.3DGKS7JjelP2aguQPnCE_5vnWU1dgXAdXXrR6it9vRE";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

function getApiToken() {
  axios({
    method: 'post',
    url: `https://${rootUrl}/api/identity/getsyspartnertoken`,
    data: {
      'email': 'newman.partner@dacc.com',
      'password': test_pw
    },
    headers: {
      "X-API-Version": 1.0,
      "Content-Type": "application/json"
    },
  })
  .then(response => {
    jwt = `Bearer ${response.data}`;
    console.log('\nYour API token:\n' + response.data);
  })
  .catch(error => {
    console.log(error.response.status);
  });
}

function getFirmToken() {
  axios({
    method: 'post',
    url: `https://${rootUrl}/api/identity/getsysnonpartnertoken`,
    data: {
      'email': 'newman.firm@dacc.com',
      'password': test_pw
    },
    headers: {
      "X-API-Version": 1.0,
      "Content-Type": "application/json",
      "Authorization": jwt
    },
  })
  .then(response => {
    firm_jwt = `Bearer ${response.data}`;
    console.log('\nYour Firm token:\n' + response.data);
  })
  .catch(error => {
    console.log(error.response.status);
  });
}

function getCoins() {
  axios({
    method: 'get',
    url: `https://${rootUrl}/api/reference/coins/`,
    headers:{
      "X-API-Version": 1.0,
      "Content-Type": "application/json",
      "Authorization": firm_jwt
    }
  })
  .then(response => {
    console.log('\nCoins:\n');
    console.log(response.data);
  })
  .catch(error => {
    console.log(error.response.status);
  });
}

getApiToken();
setTimeout(getFirmToken, 3000);
setTimeout(getCoins, 6000);
setTimeout(process.exit, 9000);
