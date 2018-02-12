// const express = require('express');

/* const express = require('express');
>>>>>>> 8a681bfafd7dc7376ae08305539c03344a0f4ed1

// const app = express();

// app.use(express.static(__dirname + '/public'));

 */
/*const server = app.listen(8080);

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

    socket.on('abc', body => {
      socket.broadcast.emit('abc', body);
    })

    socket.on('subscribe', function(room) {
      console.log('joining room', room);
      socket.join(room);
    });
  
    socket.on('send message', function(data) {
        console.log('sending room post', data.room);
        socket.broadcast.to(data.room).emit('conversation private post', {
            message: data.message
        });
    });

    


});


console.log(`SkypeClone's Socket server is running at port 8080...
Wait! for a while to start client side server.`);*/