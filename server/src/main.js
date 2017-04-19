var api = require('./api');

const _api = new api();

let portNumber = 3000;

process.argv.every((val, index, array) => {
    let portParam = '--port:';
    if (val.indexOf(portParam) >= 0) {
        let parameterVal = val.replace(portParam, '');
        portNumber = parseInt(parameterVal);
        return false;
    }
    return true;
});

_api.exposeDEEndpoints(portNumber);


