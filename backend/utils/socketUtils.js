const io = require('../app');

function getSocketId(userId) {
  return Array.from(io.sockets.sockets.values()).find(
    (socket) => socket.userId === userId
  )?.id;
}

module.exports = { getSocketId };
