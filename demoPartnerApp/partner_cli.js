const readline = require('readline');
const axios = require('axios');

const rootUrl = "devapi.custody.center";
// const test_pw = "WK!l@g@1fY$A3*l";
let test_pw = "";
let userId = "";
let coinTypeId = "";
let partner_token = "";
let email = "";

// grayson.cowing@gmail.com
// WK!l@g@1fY$A3*l

// const partner_token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiR3JheXNvbiBDb3dpbmciLCJJcGEiOiI2NS4yMTcuMjQ0Ljk4IiwiUGFyZW50Q29tcGFueSI6IkZvb2JhciAmIFNvbnMgQ3J5cHRvIEhvbGRpbmcgSW5jIiwiUGFpIjoiYjQyNTkxODItMDViMS00Mjg3LTgzYTYtY2FiMDJhNDc0ZjFjIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiUGFydG5lciIsIlVpZCI6IjFmYjNhZGNmLTcxNjEtNDRkNC04Yzg2LTA4ZDYzZjUzMWQ0YSIsIm5iZiI6MTU0MTAxNzc1OCwiZXhwIjoxNTcyNTUzNzU4LCJpc3MiOiJkaWdpdGFsYXNzZXRjdXN0b2R5LmNvbSIsImF1ZCI6IlJlZFdpbmdBdWRpZW5jZSJ9.IJyCZCI1sigA1hfcdDBfqPH11ddk3zS9IH3cQqH8Y0I";

// const jwt_firm = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiTmV3bWFuIChGaXJtKSBTeXN0ZW0gQWNjb3VudCIsIklwYSI6Ijo6MSIsIlBhcmVudENvbXBhbnkiOiJOZXdtYW4gKEZpcm0pIiwiUGFpIjoiMTA1MzU0MjMtOTJjMy00N2JhLWIwZWQtNjU0NmU2YTliODEwIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiRmlybSIsIlVpZCI6IjgyNmExYzc2LTdiYWItNDZiNy04MWVkLWQwYTFkYjJlNjc1YiIsIm5iZiI6MTU0MTA3OTk3NCwiZXhwIjoxNjk4NzU5OTc0LCJpc3MiOiJkaWdpdGFsYXNzZXRjdXN0b2R5LmNvbSIsImF1ZCI6IlJlZFdpbmdBdWRpZW5jZSJ9._dowsZCB6Ut2q6jgHtCQvaAt1fyOWFTfXEb6gpe-uNU";

let firm_users_token = "";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function startSession() {
  rl.question("\nEnter your partner token: ", (answer1) => {
    rl.question("\nEnter you email: ", (answer2) => {
      rl.question("\nEnter your password: ", (answer3) => {
        partner_token = `Bearer ${answer1}`;
        email = answer2;
        test_pw = answer3;
        validateCredentials();
        setTimeout(continueSession, 3000);
      });
    });
  });
}

function continueSession() {
  rl.question("\nEnter your security code: ", (answer4) => {
    totpCode = answer4;
    setTimeout(validateTotp, 3000);
    setTimeout(getCoins, 6000);
    setTimeout(getCoinTypes, 9000);
    setTimeout(insertDestinationAccount, 12000);
    rl.close();
  });
}

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

function validateCredentials() {
  axios({
    method: 'post',
    url: `https://${rootUrl}/api/identity/validatecredentials`,
    data: {
      'email': email,
      'password': test_pw
    },
    headers: {
      "X-API-Version": 1.0,
      "Content-Type": "application/json",
      "Authorization": partner_token
    },
  })
  .then(response => {
    console.log('\nUser ID:\n' + response.data.userId);
    userId = response.data.userId;
  })
  .catch(error => {
    console.log(error);
  });
}

function validateTotp() {
  axios({
    method: 'post',
    url: `https://${rootUrl}/api/identity/validatetotp`,
    data: {
      'userId': userId,
      'totpCode': totpCode,
    },
    headers: {
      "X-API-Version": 1.0,
      "Content-Type": "application/json",
      "Authorization": partner_token
    },
  })
  .then(response => {
    console.log('\nFirm Users Token:\n' + response.data)
    firm_users_token = `Bearer ${response.data}`;
  })
  .catch(error => {
    console.log(error);
  });
}

function getCoins() {
  axios({
    method: 'get',
    url: `https://${rootUrl}/api/reference/coins/`,
    headers:{
      "X-API-Version": 1.0,
      "Content-Type": "application/json",
      "Authorization": firm_users_token
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

function getCoinTypes() {
  axios({
    method: 'get',
    url: `https://${rootUrl}/api/reference/cointypes/`,
    headers:{
      "X-API-Version": 1.0,
      "Content-Type": "application/json",
      "Authorization": firm_users_token
    }
  })
  .then(response => {
    console.log('\nCoin Types:\n');
    console.log(response.data);
    coinTypeId = response.data.find(coin => coin.name == "Bitcoin").id;
    // console.log(coinType);
  })
  .catch(error => {
    console.log(error.response.status);
  });
}

function insertDestinationAccount() {
  axios({
    method: 'post',
    url: `https://${rootUrl}/api/account/destinationaccounts`,
    data: {
      "id": "00000000-0000-0000-0000-000000000000",
      "name": "TZG DestAcct 1-800-ABCDEFG",
      "walletAddress": "1QF4NgxgF86SH4dizN4JPHMprWBHbKdSmJ",
      "coinType": {
        "id": `${coinTypeId}`
      }
    },
    headers: {
      "X-API-Version": 1.0,
      "Content-Type": "application/json",
      "Authorization": firm_users_token
    },
  })
  .then(response => {
    console.log('\nDestination Account:\n');
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });
}

// validateCredentials();
// setTimeout(validateTotp, 3000);
// setTimeout(getCoins, 6000);
// setTimeout(getCoinTypes, 9000);
// setTimeout(insertDestinationAccount, 12000);

startSession();
