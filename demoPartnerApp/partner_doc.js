const axios = require('axios');

const rootUrl = "devapi.custody.center";
//end user password
const test_pw = "";
let userId = "";
let end_users_token = "";

//set token here
const api_token = "";


function getHeaders(token){
  return { 
      "X-API-Version": 1.0,
      "Content-Type": "application/json",
      "Authorization": token 
  }
}

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

function validateCredentials() {
  axios({
    method: 'post',
    url: `https://${rootUrl}/api/identity/validatecredentials`,
    data: {
      'email': "grayson.cowing@gmail.com",
      'password': test_pw
    },
    headers: getHeaders(api_token),
  })
  .then(response => {
    userId = response.data.userId;
  })
  .catch(error => {
    console.log(error)
  });
}

function validateTotp() {
  axios({
    method: 'post',
    url: `https://${rootUrl}/api/identity/validatetotp`,
    data: {
      'userId': userId,
      'totpCode': '9999999',
    },
    headers: getHeaders(api_token),
  })
  .then(response => {
    end_users_token = `Bearer ${response.data}`;
  })
  .catch(error => {
    console.log(error)
  });
}

function getCoins() {
  axios({
    method: 'get',
    url: `https://${rootUrl}/api/reference/coins/`,
    headers: getHeaders(end_users_token),
  })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error)
  });
}

validateCredentials();
setTimeout(validateTotp, 3000);
setTimeout(getCoins, 6000);
