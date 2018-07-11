
module.exports = function (app) {

  const io = require('socket.io')(app);

  io.on('connection', socket => {

    function NumOfClients(docId){
      let clients = io.nsps['/'].adapter.rooms[docId];
      return (clients) ? clients.length : 0;
    }

    socket.on('leaveDoc', (requestedRoom) => {
      if(requestedRoom.docId){
        socket.to(requestedRoom.docId).emit('userLeft', requestedRoom.username);
        socket.leave(requestedRoom.docId);
      }
    });

    socket.on('document', (requestedRoom) => {
      if (!requestedRoom.docId) {
        return socket.emit('errorMessage', 'No room!');
      }
      socket.document = requestedRoom.docId;
      socket.username = requestedRoom.username;
      if(NumOfClients(requestedRoom.docId) < 6){
        socket.join(requestedRoom.docId, () => {
          socket.to(requestedRoom.docId).emit('joined', requestedRoom.username);
        });
      } else {
        socket.emit('failedToJoin', requestedRoom);
      }
    });
  });

};
