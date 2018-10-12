const bip39 = require("bip39");
const bip32 = require("ripple-bip32");
const ripple = require('ripplelib');
const sign = require('ripple-sign-keypairs');
const RippleAPI = require('ripple-lib').RippleAPI;

const { USBAdapter } = require('../adapters/USBAdapter')


const {
  RippleWallet
} = require("./RippleWallet");

class RippleTx {
  constructor(accountName, accountIndex, destination, amount = "") {
    this.accountName = accountName;
    this.accountIndex = accountIndex;
    this.destination = destination;
    this.amount = amount;
    this.run();
  }

  async run() {
    
    const api = new RippleAPI({
      // This is the Ripple testnet server
      server: 'wss://s.altnet.rippletest.net:51233'  
    });
    await api.connect();
    const usbPath = await USBAdapter.getPath().catch(err => {console.log(err)});
    const wallet = JSON.parse(fs.readFileSync(`${usbPath}\accounts\\${this.accountName}.json`,'utf8'))

    this.account = wallet.accounts[this.accountIndex].address;
    this.pubKey = wallet.accounts[this.accountIndex].pubKey
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

    const prepared = await api.preparePayment(this.account, payment, {
      maxLedgerVersionOffset: 500
    });

    const tx = {
      tx: prepared.txJSON,
      pubKey: this.pubKey
    }

    api.disconnect();
    console.log(tx);
    fs.writeFileSync(`${usbPath}/UTX/UTX.json`, JSON.stringify(tx));
  }
}


module.exports = RippleTx;

'rPEPPER7kfTD9w2To4CQk6UCfuHM9c6GDY'

"key.to_address_string()"

"npm run --silent cli sign-transaction rPqjUtmrY9JmfPoDVnBgjQkaDpxTPdzfPp sp6T5GywsDgzqzawedNkVNYiW1P8e rPEPPER7kfTD9w2To4CQk6UCfuHM9c6GDY 1"