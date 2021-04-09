const serverless = require('serverless-http');
const express = require('express');
const app = express();

app.get('/', function(req, res) {
    res.json({'message': 'Hello World!'})
});

module.exports.handler = serverless(app);