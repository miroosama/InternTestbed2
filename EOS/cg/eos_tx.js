const request = require("request");

function get_info() {
  var options = { method: 'POST',
  url: 'http://127.0.0.1:8888/v1/chain/get_info' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
}

get_info()