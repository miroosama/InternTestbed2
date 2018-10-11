const RippleAPI = require('ripple-lib').RippleAPI;
const sign = require('ripple-sign-keypairs');

const api = new RippleAPI({
  server: 'wss://s.altnet.rippletest.net:51233' // XRP Test Net
});

class Payment {
  constructor(account, destination, amount) {
    this.account = account;
    // this.secret = secret;
    this.destination = destination;
    this.amount = amount;
    this.keyPair = {
      privateKey: '00C16E04B0782140BE072F1FEF44BCD09D4C7B6E7A5D4721C0C5CC12CC91D1DC0D',
      publicKey: '032B044728A7751E3E184BE07116E824285197D2A9F8902BE206A19146691A8F50'
    };
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
    } = sign(prepared.txJSON, this.keyPair);
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