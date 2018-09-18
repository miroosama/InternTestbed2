const { RPCAdapter } = require('../classes/RPCAdapter');

test("rpcPost returns an object", () => {
  expect(typeof RPCAdapter.post('getblockchaininfo')).toBe("object")
})

test("rpcPost returns a promise that can be resolved", () => {
<<<<<<< HEAD
  return RPCAdapter.post('getblockchaininfo').then(resp => {
=======
  // console.log(newRPC.rpcPost('getblockchaininfo'))
  return newRPC.rpcPost('getblockchaininfo').then(resp => {
    console.log(resp)
>>>>>>> 73b2fbf812b92a961470fb31f611a64bb1bb1189
    expect(Object.keys(resp).length).toBeGreaterThan(0);
  })
})