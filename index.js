var express = require('express'),
    serveStatic = require('serve-static'),
    http = require('http'),
    server = require('./js/server-push');

var app = express();
app.use(serveStatic(__dirname, {'index': false}));
server(app, '/');

var httpServer = http.createServer(app);
httpServer.listen(433);