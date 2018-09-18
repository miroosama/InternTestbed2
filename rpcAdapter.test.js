const {
  rpcPost
} = require('./rpcAdapter');

test("rpcPost returns an object", () => {
  expect(typeof rpcPost('getblockchaininfo')).toBe("object")
})

test("rpcPost returns a promise that can be resolved", () => {
  return rpcPost('getblockchaininfo').then(resp => {
    expect(Object.keys(resp).length).toBeGreaterThan(0);
  })
})