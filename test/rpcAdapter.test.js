const {
  RPCAdapter
} = require('../classes/classbin/RPCAdapter');

test("rpcPost returns an object", () => {
  expect(typeof RPCAdapter.post('sendrawtransaction')).toBe("object")
})

test("rpcPost returns a promise that can be resolved", () => {
  return RPCAdapter.post('getblockchaininfo').then(resp => {
    expect(Object.keys(resp).length).toBeGreaterThan(0);
  })
})