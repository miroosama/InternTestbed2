const RPC = require('../classes/rpcAdapter');
const newRPC = new RPC();
test("rpcPost returns an object", () => {
  expect(typeof newRPC.rpcPost('getblockchaininfo')).toBe("object")
})

test("rpcPost returns a promise that can be resolved", () => {
  // console.log(newRPC.rpcPost('getblockchaininfo'))
  return newRPC.rpcPost('getblockchaininfo').then(resp => {
    console.log(resp)
    expect(Object.keys(resp).length).toBeGreaterThan(0);
  })
})