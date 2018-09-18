const { RPCAdapter } = require('../classes/RPCAdapter');

test("rpcPost returns an object", () => {
  expect(typeof RPCAdapter.post('getblockchaininfo')).toBe("object")
})

test("rpcPost returns a promise that can be resolved", () => {
  return RPCAdapter.post('getblockchaininfo').then(resp => {
    expect(Object.keys(resp).length).toBeGreaterThan(0);
  })
})