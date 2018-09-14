let arr = [];
let j = 0;

while (arr.length < 6) {
  if (arr.length === 0) {
    arr.push([])
  } else {
    if (arr[j].length < 3) {
      for (i = 0; i < 3; i++) {
        arr[j].push(i * 2)
      }
    } else {
      j++;
      arr.push([]);
      for (i = 0; i < 3; i++) {
        arr[j].push(i * 2)
      }
    }
  }
}



console.log(arr)

let address = [];
let addr = [];

function populateAddress(seed) {
  let address = [];
  let addr = [];
  for (i = 0; i < 3; i++) {
    addr.push(deriveAddress(seed))
  }
  address.push(addr);
}