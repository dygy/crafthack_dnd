'use strict';
const path = require("path");
const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const session = require('express-session');
const uuid = require('uuid');
const WebSocket = require('ws');
const app = express();
const player1 = require('./models/hardcoded_users/user1')
const player2 = require('./models/hardcoded_users/user2')
const player3 = require('./models/hardcoded_users/user3')
const player4 = require('./models/hardcoded_users/user4')
const  adminServer = new WebSocket.Server({port:3000});

//
// We need the same instance of the session parser in express and
// WebSocket server.
//
const sessionParser = session({
    saveUninitialized: false,
    secret: '$eCuRiTy',
    resave: false
});

//
// Serve static files from the 'public' folder.
//
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use(sessionParser);
app.set("views", path.join(__dirname, "./views"));
app.get('/user/1',function (req, res) {
    res.send(player1)
});
app.get('/user/2',function (req, res) {
    res.send(player2)
});
app.get('/user/3',function (req, res) {
    res.send(player3)
});
app.get('/user/4',function (req, res) {
    res.send(player4)
});

app.get('/master', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/login', function (req, res) {
    const id = uuid.v4();
    console.log(`Updating session for user ${id}`);
    req.session.userId = id;
    res.send({result: 'OK', message: 'Session updated'});
});
app.delete('/logout', function (request, response) {
    console.log('Destroying session');
    request.session.destroy(function () {
        response.send({result: 'OK', message: 'Session destroyed'});
    });
});

// Create HTTP server by ourselves.

const server = http.createServer(app);
const wss = new WebSocket.Server({noServer: true});

server.on('upgrade', function (request, socket, head) {
    console.log('Parsing session from request...');
    sessionParser(request, {}, () => {
        /*
        if (!request.session.userId) {
            socket.destroy();
            return;
        }
        */
        console.log('Session is parsed!');
        wss.handleUpgrade(request, socket, head, function (ws) {
            wss.emit('connection', ws, request);
        });
    });
});

wss.on('connection', function (ws, request) {
    ws.on('message', function (message) {
        //
        // Here we can now use session parameters.
        //
        console.log(
            `Received message ${message} from user ${request.session.userId}`
        );
    });
});

//
// Start the server.
//

server.listen(process.env.PORT || 5000,'0.0.0.0', () => console.log('Example app listening on port 5000!'));