import { io } from '../server.js';

import {
  handleMessage,
  handleCreateRoom,
  handleJoinRoom,
  handleLeaveRoom,
  handleDisconnect
} from './socketHandlers.js';


io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);


  socket.on("send_message", (data) => {
    handleMessage(data);
  });


  socket.on("create_room", async (roomName) => {
    const chatrooms = await handleCreateRoom(roomName);
    io.emit("update_chatrooms", chatrooms);
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
