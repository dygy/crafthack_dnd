'use strict';
const getQ = require('./iniciative');
const path = require("path");
const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const session = require('express-session');
const app = express();let infight=false;
const player = function(id) {
   return require('./models/hardcoded_users/user'+id)
};
const notDead= require('./game');
let lastClient=0;
let initiativeArr = [];
const monster = function(id) {
    return require('./models/hardcoded_mobs/mob'+id)
};
const turnAfterArray = require('./app');
const server = http.createServer(app);
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

});
app.get('/update', function (req, res) {

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
    wss = new WebSocketServer({server: server});
    const CLIENTS=[];
    let admin;

wss.on('connection', function(ws) {
    console.log(CLIENTS);
    if (CLIENTS.length===0){
        CLIENTS.push(ws);
        admin = ws;
     //   ws.send('you are admin')
    }
    else {
        CLIENTS.push(ws);
        if (CLIENTS.length<5) {
         //   ws.send('you are player number ' + CLIENTS.length - 1)
        }
        else {
        //    ws.send('session already have players')
        }
    }
    ws.on('message', function(message) {
        if (message === 'kill'){
            process.exit()
        }
        else {
            const obj = JSON.parse(message);
            if (!infight&&obj.type === 'begin_fight'){
                const enemy = obj.body.mobsID;
                for (let x=0;x<enemy ;x++){
                    enemy[x]=monster(enemy[x])
                }
                sendToClients(JSON.stringify(obj));
                enemy.push( player(1));
                enemy.push( player(2));
                enemy.push( player(3));
                enemy.push( player(4));
                initiativeArr= getQ(enemy);
                infight =true;
                lastClient = initiativeArr[0].id;
                turnAfterArray(CLIENTS,initiativeArr)
            }
            if (infight&&obj.type === 'pass'){
                if (lastClient !== undefined){
                    CLIENTS[lastClient].send(JSON.stringify(
                        {type:'pass',
                                body:''}
                    ))}
                turnAfterArray(CLIENTS,initiativeArr)
            }
            if (infight&&obj.type === 'hit_event') {
                    for (let x=0;x<initiativeArr.length ;){
                        if (initiativeArr[x].id===obj.body.playerID){
                            initiativeArr[x].hits.current = obj.body.change
                        }
                    }
                    if (obj.body.playerID <5){
                        CLIENTS[obj.body.playerID].send(obj)
                    }
                    initiativeArr=notDead(initiativeArr)
                    if (allDead()){
                        process.exit()
                    }
                }
            }
        console.log('received: %s', message);
    });
});

function sendToClients (message) {
    for (let i=0; i<CLIENTS.length; i++) {
        CLIENTS[i].send(message);
    }
}
function sendToAdmin (message) {
        admin.send(message);
}
function allDead(){
 const   deadPeople = [];
    for (let x=0;x<initiativeArr;x++){
      if (initiativeArr.id < 5) {
          deadPeople.push(initiativeArr[x].id)
      }
    }
    return deadPeople.length > 3;
}
server.listen(process.env.PORT || 5000,'0.0.0.0', () => console.log('Example app listening on port 5000!'));