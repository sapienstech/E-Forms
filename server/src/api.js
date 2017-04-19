var fs = require('fs');
var url = require('url');
var express = require('express');
var path = require('path');
var req = require('./request');
var bodyParser = require('body-parser');
var app = express();
var request = new req();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use('/', express.static(path.join(__dirname, '../../dist')));

const SERVER_ERROR = {error: 'server error'};
const de = 'http://localhost:9090/bdes';

class Api {

    exposeEFormsEndpoints() {

        app.get('/processes', (req, res) => {
            this.getFile('processes.json', req.body).then((data) => res.send(data));
        });

        app.post('/layout', (req, res) => {
            this.getFlowFile('layout', req.body).then((data) => res.send(data));
        });
    }

    exposeDEEndpoints(port) {


        app.post('/manifest', (req, res) => {

            let options = {
                method: 'POST',
                params: {
                        artifactKey: req.body.body.artifactKey
                }
            }
            request.send(req.body.body.de + '/manifest',options, (body, _res) => {
                if (body == 'ECONNREFUSED') {
                    res.send(SERVER_ERROR)
                    return;
                }
                if(_res.statusCode >= 200 && _res.statusCode < 400) {
                    res.send(JSON.parse(_res.body));
                }
                else{
                    res.send({error:'error'});
                }

            });
        });


        app.get('/de-servers', (req, res) => {
            this.getFile('distributed-de-servers.json', req.body).then((data) => res.send(data));
        });


        app.get('/heartbeat', (req, res) => {
            request.send(req.query.url + '/heartbeat', {
                method: 'GET',
                params: null,
            }, (body, _res) => {
                if (body == 'ECONNREFUSED') {
                    res.send(SERVER_ERROR)
                    return;
                }
                if(_res.statusCode >= 200 && _res.statusCode < 400) {
                    res.send({status:_res.body});
                }
                else{
                    res.send({error:'error'});
                }
            });
        });

        app.get('/local-heartbeat', (req, res) => {
            request.send(de + '/ws/rs/api/2_0/execute/heartbeat', {
                method: 'GET',
                params: null,
            }, (body, _res) => {
                res.send(body != 'ECONNREFUSED');
            });
        });

        app.get('/flows', (req, res) => {

            request.send(req.query.url + '/repo/findAllArtifactKeysWithVersionAndEffectiveDates', {
                method: 'GET',
                params: null,
            }, (body, _res) => {
                if (body == 'ECONNREFUSED') {
                    res.send(SERVER_ERROR)
                    return;
                }
                if(_res.statusCode >= 200 && _res.statusCode < 400) {
                    let result = JSON.parse(_res.body);
                    let filtered = result.filter(r => r.artifactType == 'FLOW');
                    res.send(filtered);
                }
                else{
                    res.send({error:'error'});
                }
            });

        })

        app.post('/execute', (req, res) => {

            request.send(req.query.url + '/flow', {
                method: 'POST',
                params: req.body.body
            }, (body, _res) => {
                if(body == 'ECONNREFUSED'){
                    res.send({error:{message:'DE server is down'}})
                    return;
                }
                else if(_res.statusCode >= 200 && _res.statusCode < 400) {
                    res.send(JSON.parse(_res.body));
                }
                else{
                    res.send({error:body});
                }
            });

        });


        app.get('/ok', (req, res) => {
            res.send('OK');
        })
        let selectedPort = port || 3000;
        app.listen(selectedPort, function () {
            console.log('Example app listening on port '+ selectedPort +'!')
        })


    }


    getFlowFile(type, data) {
        return new Promise((res, rej) => {
            let key = data.name;
            fs.readFile('data/' + key + '.' + type + '.json', 'utf8', (err, data) => {
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

    getFile(file) {
        return new Promise((res, rej) => {
            fs.readFile('../data/' + file, 'utf8', (err, data) => {
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

    getMockExecutionResults(data) {
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
}

module.exports = Api;
