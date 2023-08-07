import { Socket } from 'socket.io';
import { io } from '../server';

import {
  handleMessage,
  handleCreateRoom,
  handleJoinRoom,
  handleLeaveRoom,
  handleDisconnect
} from './socketHandlers';

const ioConnect = (io: any) => {

  io.on("connection", (socket: Socket) => {
    console.log(`User Connected: ${socket.id}`);
  
  
    socket.on("send_message", (data) => {
      console.log('Message send 1234');
      handleMessage(data);
    });
  
  
    socket.on("create_room", (roomName) => {
      //
      console.log('room created');
      //
      handleCreateRoom(roomName);
    });
  
  
    socket.on("join_room", (data) => {
      console.log('joinjoinjoin1234')
      handleJoinRoom(data, socket);
    });
  
  
    socket.on("leave_room", (roomName) => {
      console.log('leave Room 1234')
      handleLeaveRoom(roomName, socket);
    });
  
  
    socket.on("disconnect", () => {
      console.log('disconnect1234')
      handleDisconnect(socket);
    });
  
  });

}

export { ioConnect }
