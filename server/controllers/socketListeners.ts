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


  socket.on("join_room", (data) => {
    handleJoinRoom(data);
  });


  socket.on("leave_room", (roomName) => {
    handleLeaveRoom(roomName);
  });


  socket.on("disconnect", () => {
    handleDisconnect(socket);
  });

});
