import { Socket } from 'socket.io';
import { Server } from 'socket.io';
import { ChatRoom, Message } from '../models/types';

import {
  handleCreateRoom,
  handleJoinRoom,
  handleLeaveRoom,
  handleDisconnect,
} from './socketHandlers';

let sockets: Socket[] = [];

const ioConnect: Function = (io: Server) => {
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

    socket.on('create_room', (roomName: string) => {
      const newChatroom: ChatRoom = {
        name: roomName,
        users: 0,
        usernames: [],
        creator: socket.id,
      };
      handleCreateRoom(newChatroom);
    });

    socket.on('join_room', (roomName: string) => {
      handleJoinRoom(roomName, socket);
    });

    socket.on('leave_room', (roomName: string) => {
      handleLeaveRoom(roomName, socket);
    });

    socket.on('disconnect', () => {
      sockets = sockets.filter((storedSocket) => storedSocket.id !== socket.id);
      handleDisconnect(socket);
    });
  });
};

export { ioConnect };
