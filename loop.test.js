const {
  loop
} = require("./loop");

test("Checking the type", () => {
  expect(typeof loop).toEqual("function")
});

test("Checking the type of the function's return", () => {
  expect(typeof loop()).toEqual("object")
});