const readline = require('readline');
const axios = require('axios');

const rootUrl = "devapi.custody.center";
let test_pw = "";
let userId = "";
let api_token = "";
let email = "";
let firm_users_token = "";

function getHeaders(token){
  return { 
      "X-API-Version": 1.0,
      "Content-Type": "application/json",
      "Authorization": token 
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function startSession() {
  rl.question("\nEnter your API token: ", (answer1) => {
    rl.question("\nEnter you email: ", (answer2) => {
      rl.question("\nEnter your password: ", (answer3) => {
        api_token = `Bearer ${answer1}`;
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
    headers: getHeaders(api_token),
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
    headers: getHeaders(api_token),
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
    headers: getHeaders(firm_users_token),
  })
  .then(response => {
    console.log('\nCoins:\n');
    console.log(response.data);
  })
  .catch(error => {
    console.log(error.response.status);
  });
}


startSession();
