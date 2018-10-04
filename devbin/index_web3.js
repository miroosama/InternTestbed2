// index file reserved as top level file. will bridge UI and wallet classes and be used as target script for running everything else via shebang etc.
const {
  User
} = require('./classes_web3/web3User_ie')

const user1 = new User()
user1.startSession()