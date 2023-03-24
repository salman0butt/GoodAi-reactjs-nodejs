const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// port
const PORT = process.env.PORT || 5000;

io.on('connection', (socket) => {
  console.log('Connection connected');
  // sending random value
  setInterval(() => {
    // emitting value
    const x = 0.01 * Math.random();
    const y = 0.01 * Math.random();
    io.emit('FETCH_RANDOM_VALUE', { x, y });
  }, 100);

  // disconnect
  socket.on('disconnect', () => {
    console.log('Connection disconnected');
  });
});

// listen to server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
