if(typeof v8debug === 'object') {
        process.env.DEBUG_MODE = true;
}
else {
    process.env.DEBUG_MODE = false;
}

var api = require('./api');
const _api = new api();

let portNumber = 3000;
let portParam = '--port:';

process.argv.every((val, index, array) => {
    if (val.indexOf(portParam) >= 0) {
        let parameterVal = val.replace(portParam, '');
        portNumber = parseInt(parameterVal);
        return false;
    }
    return true;
});
if (process.env.port && process.env.port.indexOf(portParam) >= 0) {
    let parameterVal = process.env.port.replace(portParam, '');
    portNumber = parseInt(parameterVal);
}
_api.exposeDEEndpoints(portNumber);
_api.exposeAlisEndpoints(portNumber);


