SECTION 1: ONBOARDING 

1. log in as DACC admin
2. create a partner company
3. add a user to the partner company
4. create a firm
5. add a user to the firm
6. sign out
7. onboard your firm user by taking the one time password from that user's email inbox and stepping through to the 2FA and subsequently to the dashboard.
8. sign out of your firm user
9. onboard your partner account by going through the same steps. once you reach the dashboard, click 'get api token'. 

SECTION 2: AUTHENTICATING 

1. in your app, hard code your partner token as a variable
2. use this token as the bearer auth for a request aimed at the /api/identity/validatecredentials endpoint
3. pass your firm user's credentials in as the body of this request
4. you will recieve a UUID as the response. set this ID to {{userId}}
5. start building a request to the /api/identity/validatetotp
6. pass the partner token in as the bearer auth
7. set the body to { "userId": "{{userId}}", "totpCode": "9999999"} (note: these seven 9s are just part of the dev build
8. execute the request
9. the response will cotain a new token: this token is your firm users token, and will be used from here on out as a header when building all subsequent requests 

SECTION 3: FIRM USAGE

1. firm user stories typically begin with creating a destination account, create one using a valid address for the selected cointype
2. once a destination account is created an admin user on DACC's side must approve the destination. once the status of the destination has changed you will be able to build a transaction.