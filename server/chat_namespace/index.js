const config = require('../config');
const { privateMessagePCSignaling } = require('./events');

// Socket namespace
let namespace;
const users = {
  general: [],
  sports: [],
  games: [],
};

const onConnection = (socket) => {
  socket.on('joinRoom', events.joinRoom(socket, namespace)); // Join a room
  socket.on('publicMessage', events.publicMessage(namespace)); // New public messages
  socket.on('leaveRoom', events.leaveRoom(socket, namespace)); // Leave room
  socket.on('leaveChat', events.leaveChat(socket, namespace)); // Leave the chat
  socket.on('joinPrivateRoom', events.joinPrivateRoom(socket, namespace)); // Join private chat
  socket.on('leavePrivateRoom', events.leavePrivateRoom(socket, namespace)); // Leave private chat
  socket.on('privateMessage', events.privateMessage(namespace)); // Private message
  socket.on('changeStatus', events.changeStatus(socket, namespace)); // // Set status
  // Private message for Signaling PeerConnection
  socket.on('privateMessagePCSignaling', events.privateMessagePCSignaling(namespace))
};

exports.createNameSpace = (io) => {
  namespace = io
    .of(config.CHAT_NAMESPACE)
    .on('connection', onConnection);
};
