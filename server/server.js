var path = require('path');
var express = require('express')
var bodyParser = require('body-parser');
var http = require('http');
var fs = require('fs');
var url = require('url');
var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use('/', express.static(path.join(__dirname, '../dist')));
const de = 'http://localhost:9090/bdes';


urlReq = function (reqUrl, options, cb) {
    if (typeof options === "function") {
        cb = options;
        options = {};
    }// incase no options passed in

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
    if (options.params) {
        options.params = JSON.stringify(options.params);
        settings.headers['Content-Type'] = 'application/json';
        settings.headers['Content-Length'] = options.params.length;
    }
    ;

    // MAKE THE REQUEST
    var req = http.request(settings);

    // if there are params: write them to the request
    if (options.params) {
        req.write(options.params)
    }
    ;

    // when the response comes back
    req.on('response', (res) => {
        res.body = '';
        res.setEncoding('utf-8');

        // concat chunks
        res.on('data', function (chunk) {
            res.body += chunk
        });

        // when the response has finished
        res.on('end', function () {

            // fire callback
            cb(res.body, res);
        });
    });

    req.on('error', (res) => {
        cb(res.code);
    });
    // end the request
    req.end();
}

function getFlowFile(type,data) {
    return new Promise((res, rej) => {
        let key = data.name;
        fs.readFile('data/' + key + '.'+type+'.json', 'utf8', (err, data) => {
            if (!err) {
                let file = JSON.parse(data);
                res(file);
            }
            else {
                if (rej) rej(err);
            }
        });

    });

}

function getFile(file){
    return new Promise((res, rej) => {
        fs.readFile('data/'+file, 'utf8', (err, data) => {
            if (!err) {
                let file = JSON.parse(data);
                res(file);
            }
            else {
                if (rej) rej(err);
            }
        });

    });
}

function getMockExecutionResults(data) {
    return new Promise((res, rej) => {
        let flow = data.executableKey.artifactKey.name;
        fs.readFile('data/' + flow + '.result.json', 'utf8', (err, data) => {
            if (!err) {
                let file = JSON.parse(data);
                res(file);
            }
            else {
                if (rej) rej(err);
            }
        });

    });


}

app.get('/processes', (req, res) => {
    getFile('processes.json',req.body).then((data) => res.send(data));
});

app.post('/layout', (req, res) => {
    getFlowFile('layout',req.body).then((data) => res.send(data));
});

app.post('/manifest', (req, res) => {
    urlReq(de + '/ws/rs/api/2_0/execute/manifest', {
        method: 'POST',
        params: null,
    }, (body, _res) => {
        if (body == 'ECONNREFUSED') {
            getFlowFile('manifest',req.body).then((data) => res.send(data));
        }
        else {
            res.send(JSON.parse(_res.body));
        }
    });
});


app.get('/heartbeat', (req, res) => {
    urlReq(de + '/ws/rs/api/2_0/execute/heartbeat', {
        method: 'GET',
        params: null,
    }, (body, _res) => {
        res.send(body != 'ECONNREFUSED');
    });
});

app.post('/execute', (req, res) => {

    urlReq(de + '/ws/rs/api/2_0/execute/flow', {
        method: 'POST',
        params: req.body
    }, (body, _res) => {
        if (body == 'ECONNREFUSED') {
            getMockExecutionResults(req.body).then((data) => res.send(data));
        }
        else {
            res.send(JSON.parse(_res.body));
        }
    });

});


app.get('/ok', (req, res) => {
    res.send('OK');
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
