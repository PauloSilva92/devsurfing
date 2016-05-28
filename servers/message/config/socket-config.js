const server = require('./server-config');

var io = require('socket.io')(server);

io.on('connection', function(socket){
	socket.on('newMessage',function(data){
        socket.broadcast.emit('newMessage',data);
    })
});
 
module.exports = io;
