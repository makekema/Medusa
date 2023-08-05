import { Socket } from 'socket.io';
import { io } from '../server.js';

import {
  handleMessage,
  handleCreateRoom,
  handleJoinRoom,
  handleLeaveRoom,
  handleDisconnect
} from './socketHandlers.js';


io.on("connection", (socket: Socket) => {
  console.log(`User Connected: ${socket.id}`);


  socket.on("send_message", (data) => {
    handleMessage(data);
  });


  socket.on("create_room", (roomName) => {
    handleCreateRoom(roomName);
  });


  socket.on("join_room", (data, socket) => {
    handleJoinRoom(data, socket);
  });


  socket.on("leave_room", (roomName, socket) => {
    handleLeaveRoom(roomName, socket);
  });


  socket.on("disconnect", () => {
    handleDisconnect(socket);
  });

});
