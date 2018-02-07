const express = require('express');

const app = express();

app.use(express.static(__dirname + '/public'));


const server = app.listen(8080);

const io = require('socket.io').listen(server);

io.sockets.on('connection', socket => {
    const sessionid = socket.id;
    console.log("Socket Connected: %s",  sessionid);
    socket.on('message', body => {
      socket.broadcast.emit('message', {
        body,
        id: sessionid,
      })
    })
});


console.log(`SkypeClone's Socket server is running at port 8080...
Wait! for a while to start client side server.`);