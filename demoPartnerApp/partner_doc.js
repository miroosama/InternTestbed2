const axios = require('axios');

const rootUrl = "devapi.custody.center";
const test_pw = "WK!l@g@1fY$A3*l";
let userId = "";
let firm_users_token = "";

const api_token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiR3JheXNvbiBDb3dpbmciLCJJcGEiOiI2NS4yMTcuMjQ0Ljk4IiwiUGFyZW50Q29tcGFueSI6IkZvb2JhciAmIFNvbnMgQ3J5cHRvIEhvbGRpbmcgSW5jIiwiUGFpIjoiYjQyNTkxODItMDViMS00Mjg3LTgzYTYtY2FiMDJhNDc0ZjFjIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiUGFydG5lciIsIlVpZCI6IjFmYjNhZGNmLTcxNjEtNDRkNC04Yzg2LTA4ZDYzZjUzMWQ0YSIsIm5iZiI6MTU0MTAxNzc1OCwiZXhwIjoxNTcyNTUzNzU4LCJpc3MiOiJkaWdpdGFsYXNzZXRjdXN0b2R5LmNvbSIsImF1ZCI6IlJlZFdpbmdBdWRpZW5jZSJ9.IJyCZCI1sigA1hfcdDBfqPH11ddk3zS9IH3cQqH8Y0I";


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
    firm_users_token = `Bearer ${response.data}`;
  })
  .catch(error => {
  });
}

function getCoins() {
  axios({
    method: 'get',
    url: `https://${rootUrl}/api/reference/coins/`,
    headers: getHeaders(firm_users_token),
  })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
  });
}

validateCredentials();
setTimeout(validateTotp, 3000);
setTimeout(getCoins, 6000);
