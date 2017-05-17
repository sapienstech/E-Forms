var Service = require('node-windows').Service;
console.log(process.argv);

let arg = null;
if(process.argv.length>2) arg = process.argv[2];

// Create a new service object
var svc = new Service({
    name:'DEMC',
    description: 'DEMC',
    script: './src/main.js ',
    env: {name:'port',value:arg}
});

svc.on('install',function(){
    console.log('started');
    svc.start();
});

svc.install();
