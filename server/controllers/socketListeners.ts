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


  socket.on("send_message", (data: any) => {
    handleMessage(data);
  });


  socket.on("create_room", async (roomName: string) => {
    const chatrooms = await handleCreateRoom(roomName);
    io.emit("update_chatrooms", chatrooms);
  });


  socket.on("join_room", (data: any) => {
    handleJoinRoom(data);
  });


  socket.on("leave_room", (roomName: string) => {
    handleLeaveRoom(roomName);
  });


  socket.on("disconnect", () => {
    handleDisconnect(socket);
  });

});
