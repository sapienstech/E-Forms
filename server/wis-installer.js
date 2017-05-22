var Service = null;
if(process.platform == 'win32')
    Service = require('node-windows').Service;
if((process.platform == 'linux') || (process.platform == 'freebsd'))
    Service = require('node-linux').Service;

console.log(process.argv);

let arg = null;
if(process.argv.length>2) arg = process.argv[2];

// Create a new service object
var svc = new Service({
    name:'DEMC',
    description: 'DEMC',

    script: './bundle.js ',

    env: {name:'port',value:arg}
});

svc.on('install',function(){
    console.log('started');
    svc.start();
});

svc.install();
