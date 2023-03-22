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
    const randomValue = Math.random() * 4 + 1;
    // emitting value
    io.emit('randomValue', randomValue);
  }, 10000);

  // disconnect
  socket.on('disconnect', () => {
    console.log('Connection disconnected');
  });
});

// listen to server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
