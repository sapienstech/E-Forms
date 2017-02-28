var express = require('express')
var bodyParser = require('body-parser');
var http = require('http');
var url = require('url');
var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/', express.static(__dirname + '/dist'));
const de = 'http://localhost:9090/bdes/ws/rs/api/2_0/execute/flow';


urlReq = function(reqUrl, options, cb){
    if(typeof options === "function"){ cb = options; options = {}; }// incase no options passed in

    // parse url to chunks
    reqUrl = url.parse(reqUrl);

    // http.request settings
    var settings = {
        host: reqUrl.hostname,
        port: reqUrl.port || 80,
        path: reqUrl.pathname,
        headers: options.headers || {},
        method: options.method || 'GET'
    };

    // if there are params:
    if(options.params){
        options.params = JSON.stringify(options.params);
        settings.headers['Content-Type'] = 'application/json';
        settings.headers['Content-Length'] = options.params.length;
    };

    // MAKE THE REQUEST
    var req = http.request(settings);

    // if there are params: write them to the request
    if(options.params){ req.write(options.params) };

    // when the response comes back
    req.on('response', function(res){
        res.body = '';
        res.setEncoding('utf-8');

        // concat chunks
        res.on('data', function(chunk){ res.body += chunk });

        // when the response has finished
        res.on('end', function(){

            // fire callback
            cb(res.body, res);
        });
    });

    // end the request
    req.end();
}

app.post('/execute',(req,res)=> {

    urlReq(de, {
        method: 'POST',
        params:req.body
    }, (body, _res)=>{
        res.send(JSON.parse(_res.body));
    });

});


app.get('/ok',(req,res)=>{
    res.send('OK');
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
