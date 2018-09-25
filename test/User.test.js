const {
  User
} = require('../classes/User');

const user = new User;
const mnemonic = "fun swamp jump history obvious scare struggle deputy cannon village buzz state power play expose moral million lift gravity size chalk grocery scout toss";

test("User is a function", () => {
  expect(typeof User).toEqual("function")
});

test("createWallet returns first address and address for change", () => {
  expect(user.createWallet(mnemonic, "false")).toEqual(["mgTaJF2s7x8QdLUN91YGFCg134UwG121io", "mjzPPZdKjuT4TkEzuFvytywZMJaep7ft18"])
});

test("checkBalance returns valid format of balance", () => {
  return user.checkBalance().then(resp => {
    expect(typeof resp).toBe("number");
  })
})