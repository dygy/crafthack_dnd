'use strict';

const path = require("path");
const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const session = require('express-session');
const uuid = require('uuid');
const WebSocket = require('ws');
const app = express();
const player = function(id) {
   return require('./models/hardcoded_users/user'+id)
};
const monster = function(id) {
    return require('./models/hardcoded_mobs/mob'+id)
};
const  adminServer = new WebSocket.Server({port:3000});
let players = 1;
//
// We need the same instance of the session parser in express and
// WebSocket server.
//
app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: true}))

//
// Serve static files from the 'public' folder.
//
app.use(bodyParser.urlencoded({ extended: true }));
app.set("public", path.join(__dirname, "./public"));
app.use(express.static('./public'));

app.get('/master', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/',function (req, res) {
    const id = uuid.v4();
    console.log(`Updating session for user ${id}`);
    req.session.userId = id;
    res.sendFile(__dirname + '/public/login.html');
});
app.get('/user/1',function (req, res) {
    res.send(player(1))});
app.get('/user/2',function (req, res) {
    res.send(player(2))});
app.get('/user/3',function (req, res) {
    res.send(player(3))});
app.get('/user/4',function (req, res) {
    res.send(player(4))});
app.get(/monster/,function (req, res) {
    const numbers = req.originalUrl.match(/\d+/g).map(Number).toString().replace(/,/g,'');
    console.log(numbers);
    res.send(monster(numbers))});
app.get('/login', function (req, res) {
    res.sendFile(__dirname + '/public/login.html');
});
app.get('/update', function (req, res) {
    res.send('Session '+res.session);
});
app.delete('/logout', function (request, response) {
    console.log('Destroying session');
    request.session.destroy(function () {
        response.send({result: 'OK', message: 'Session destroyed'});
    });
});


/**
 * WebSocket server
 */
const WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 8080}),
    CLIENTS = [];
    let admin;

wss.on('connection', function(ws) {

    if (CLIENTS.length===1){
        admin = ws
        ws.send('you are admin')
    }
    else {
        CLIENTS.push(ws);
        ws.send('you are player number'+ CLIENTS.length)
    }
    ws.on('message', function(message) {
        console.log('received: %s', message);
        sendToClients(message);
    });
    ws.send("NEW USER JOINED");
});

function sendToClients (message) {
    for (let i=0; i<CLIENTS.length; i++) {
        CLIENTS[i].send("Message: " + message);
    }
}
function sendToAdmin (message) {
        admin.send("Message: " + message);
}
app.listen(process.env.PORT || 5000,'0.0.0.0', () => console.log('Example app listening on port 5000!'));