// server.js
var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 3000;
var server = app.listen(port);

app.use(express.static(__dirname + '/dist'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

var socket = require('socket.io');
var io = socket(server);
io.set('transports', ['xhr-polling']);
io.set('polling duration', 10);

io.sockets.on("connection", (socket) => {
    var gameId = socket.handshake.query.gameId
    if (gameId == null) {
        socket.disconnect();
    } else {
        socket.join(gameId);
    }
    socket.on("send message", (data) => {
        if (data.gameId != null) {
            io.to(data.gameId).emit('new message', { username: data.username, msg: data.msg });
        }
    });
});
