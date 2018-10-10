const RippleAPI = require('ripple-lib').RippleAPI;

const api = new RippleAPI({
  server: 'wss://s.altnet.rippletest.net:51233' // XRP Test Net
});

class Payment {
  constructor(account, secret, destination, amount) {
    this.account = account;
    this.secret = secret;
    this.destination = destination;
    this.amount = amount;
  }

  async run() {
    await api.connect();

    // Ripple payments are represented as JavaScript objects
    const payment = {
      source: {
        address: this.account,
        maxAmount: {
          value: `${this.amount}`,
          currency: 'XRP'
        }
      },
      destination: {
        address: this.destination,
        amount: {
          value: `${this.amount}`,
          currency: 'XRP'
        }
      }
    };

    // Get ready to submit the payment
    const prepared = await api.preparePayment(this.account, payment, {
      maxLedgerVersionOffset: 5
    });
    // Sign the payment using the sender's secret
    const {
      signedTransaction
    } = api.sign(prepared.txJSON, this.secret);
    console.log('Signed', signedTransaction)

    // Submit the payment
    const res = await api.submit(signedTransaction);

    console.log('Done', res);
    process.exit(0);
  }

}

module.exports = {
  Payment
};