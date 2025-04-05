const io = require('../server');

function getSocketId(userId) {
  return Array.from(io.sockets.sockets.values()).find(
    (socket) => socket.userId === userId
  )?.id;
}

module.exports = { getSocketId };
