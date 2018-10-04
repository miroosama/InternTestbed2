const {
  User
} = require('./web3User_ie');

const user = new User;

test("User is an object", () => {
  expect(typeof user).toEqual("object");
});

test("An instance of User has address and prk attributes", () => {
  expect(Object.keys(user)).toContain("address", "prk")
})