
const Store = require('data-store');
const store = new Store({ path: 'config.json' });
 
let count = 0
store.set('one', `${count}`); 
console.log(store.data)
for(let i = 0; i < 4; i++){
store.set('one', `${count += 1}`)
}
console.log(store.data.one)