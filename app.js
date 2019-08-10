const app = require('express');
const RedisStore = require('connect-redis');
const sessionStore = new RedisStore();
const cookieParser = express.cookieParser('some secret');

app.use(cookieParser);
app.use(express.session({store: sessionStore}));


wss.on('connection', function (rawSocket) {
    cookieParser(rawSocket.upgradeReq, null, function (err) {
        let sessionID = rawSocket.upgradeReq.signedCookies['connect.sid'];
        sessionStore.get(sessionID, function (err, sess) {
            console.log(sess);
        });
    });

});