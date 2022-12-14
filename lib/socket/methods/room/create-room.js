const { v4: uuid } = require('uuid');

const { getRoomResponse } = require('../../utils');
const db = require('../../database');

module.exports = (context, { name, host, roomType }) => {
  const { socket } = context;

  const room = {
    id: uuid(),
    name,
    roomType,
    host: {
      id: socket.id,
      name: host.name,
    },
    guests: [],
  };

  db.insert('rooms', room);
  socket.emit('roomCreated', getRoomResponse(room));

  return room;
};
