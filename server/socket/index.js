'use strict';

module.exports=(io)=>{
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

	console.log(`SkypeClone's Socket server is running at port 3001...
	Wait! for a while to start client side server.`);
	
}
