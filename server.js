// websockets server that sends DOM messages between customer and agent views
var io = require('socket.io').listen(3001);

io.set('transports', ['polling', 'websocket']);

io.sockets.on('connection', function (socket) {

  socket.on('CreateSession', function (msg) {
    console.log('CreateSession: ' + msg);
    socket.join(msg);
  });

  socket.on('PageChange', function (msg) {
    socket.join(msg);
    io.sockets.in(msg).emit('SessionStarted', '');
    console.log('PageChange');
  });

  socket.on('JoinRoom', function (msg) {
    socket.join(msg);
    console.log('JoinRoom: ' + msg);
    io.sockets.in(msg).emit('SessionStarted', '');
  });

  socket.on('ClientMousePosition', function (msg) {
    socket.broadcast.to(socket.room).emit('ClientMousePosition', {
      PositionLeft: msg.PositionLeft,
      PositionTop: msg.PositionTop
    });
  });

  socket.on('AdminMousePosition', function (msg) {
    socket.broadcast.to(msg.room).emit('AdminMousePosition', {
      PositionLeft: msg.PositionLeft,
      PositionTop: msg.PositionTop
    });
  });

  socket.on('changeHappened', function (msg) {
    socket.broadcast.to(msg.room).emit('changes', msg.change);
  });

  socket.on('DOMLoaded', function (msg) {
    console.log('DOMLoaded: ' + msg);
    socket.broadcast.to(msg.room).emit('DOMLoaded', '');
  });

});
