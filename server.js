// server.js
var express = require('express');
var path = require('path');
var port = process.env.PORT || 8080;

const server = express()
    .use(express.static(__dirname + '/dist'))
    .get('/*', (req, res) => res.sendFile(path.join(__dirname + '/dist/index.html')))
    .listen(port, () => console.log(`Listening on ${port}`));

var io = require('socket.io')(server);

io.on("connection", (socket) => {
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
