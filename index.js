// index file reserved as top level file. will bridge UI and wallet classes and be used as target script for running everything else via shebang etc.
const teladapt = require('./classes/TelnetAdapter.js')
async function printTel(){
    const printstuff = await teladapt;
    teladapt.makeRequest().then(resp=>console.log(resp))
}
printTel()