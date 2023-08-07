import { Socket } from 'socket.io';
import { io } from '../server';
import { Message } from '../types/Message';

import {
  handleCreateRoom,
  handleJoinRoom,
  handleLeaveRoom,
  handleDisconnect,
} from './socketHandlers';

let sockets: Socket[] = [];

const ioConnect = (io: any) => {
  io.on('connection', (socket: Socket) => {
    sockets.push(socket);

    socket.on('send_message', (message: Message) => {
      if (message.user) {
        sockets.map((socket) => {
          if (socket.id !== message.user) {
            socket.emit('receive_message', message);
          }
        });
      }
    });

    socket.on('create_room', (roomName) => {
      handleCreateRoom(roomName);
    });

    socket.on('join_room', (data) => {
      handleJoinRoom(data, socket);
    });

    socket.on('leave_room', (roomName) => {
      handleLeaveRoom(roomName, socket);
    });

    socket.on('disconnect', () => {
      console.log('disconnect listener fired');
      sockets = sockets.filter((storedSocket) => storedSocket.id !== socket.id);
      handleDisconnect(socket);
    });
  });
};

export { ioConnect };
