const Telnet = require('telnet-client');
let connection = new Telnet();
let command = "blockchain.scripthash.get_balance";
let scripthash = "8b01df4e368ea28f8dc0423bcf7a4923e3a12d307c875e47a0cfbf90b5c39161"

const {
  TelnetAdapter
} = require('../classes/TelnetAdapter');

const TNAd = new TelnetAdapter;

test("TelnetAdapter is a function", () => {
  expect(typeof TelnetAdapter).toEqual("function");
});

test("makeRequest returns an object", () => {
  expect(typeof TNAd.makeRequest()).toBe("object");
});

test("makeRequest returns a promise that can be resolved", () => {
  return TNAd.makeRequest().then(resp => {
    expect(Object.keys(resp).length).toBeGreaterThan(0);
  });
});

test("makeRequest returns a promise that resolves in the format of a request", () => {
  return TNAd.makeRequest().then(resp => {
    expect(Object.keys(resp)[0]).toEqual("_events");
  });
});

test("getData returns an object", () => {
  expect(typeof TNAd.getData(connection, command, scripthash)).toBe("object")
});

// test("getData returns a promise that can be resolved", () => {
//   return TNAd.getData(connection, command, scripthash).then(resp => {
//     expect(Object.keys(resp).length).toBeGreaterThan(0);
//   });
// });

test("telnetConstructor returns an object", () => {
  expect(typeof TNAd.telnetConstructor(command, scripthash)).toBe("object")
});

// test("telnetConstructor returns a promise that can be resolved", () => {
//   return TNAd.telnetConstructor(command, scripthash).then(resp => {
//     expect(Object.keys(resp).length).toBeGreaterThan(0);
//   });
// });