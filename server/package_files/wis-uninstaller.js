var Service = null;
if(process.platform == 'win32')
    Service = require('node-windows').Service;
if((process.platform == 'linux') || (process.platform == 'freebsd'))
    Service = require('node-linux').Service;

var svc = new Service({
    name:'DEMC',
    script: './bundle.js '
});

svc.on('uninstall',function(){
    console.log('Uninstall complete.');
    console.log('The service exists: ',svc.exists);
});

// Uninstall the service.
svc.uninstall();
