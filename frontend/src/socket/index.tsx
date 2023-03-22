import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

const socketInit = (): Socket => {
  console.log('im called');
  if (!socket) {
    const options = {
      'force new connection': true,
      reconnectionAttempts: Infinity,
      timeout: 10000,
      transports: ['websocket'],
    };
    socket = io('http://localhost:5000', options);
  }
  return socket;
};

export default socketInit;
