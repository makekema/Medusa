import { Socket } from 'socket.io';
import { io } from '../server';

import { Message } from '../types/Message';
import { Room } from '../types/Room';

import { db } from '../models/chatroomModel';

/* send_message */


/* create_room */

async function handleCreateRoom(roomName: string) {
  const existingRoom = await db.findChatroom(roomName);
  if (existingRoom) {
    throw new Error(`Chatroom with the name '${roomName}' already exists.`);
  }
  await db.createChatroom(roomName);

  const chatrooms = await db.getAllChatrooms();
  io.emit('update_chatrooms', chatrooms);
  //
  console.log(`New chatroom created: ${roomName}`);
  //
  return chatrooms;
}

/* join_room */

async function handleJoinRoom(data: Room, socket: Socket) {
  const chatroom = await db.findChatroom(data.name);
  if (!chatroom) return;

  socket.join(chatroom.name);
  chatroom.users += 1;
  chatroom.usernames.push(socket.id);
  await db.updateChatroom(data.name, chatroom);

  io.emit('user_join', {
    room: chatroom.name,
    username: socket.id,
    userCount: chatroom.users,
    usernames: chatroom.usernames,
  });

  if (chatroom.users <= 1) {
    socket.emit('joined_empty_room', {
      room: chatroom.name,
    });
    //
    console.log(
      `user with Id: ${socket.id} joined room: ${chatroom.name} number of users ${chatroom.users}, names of users ${chatroom.usernames}`
    );
    //
  }
}

/* leave_room */

async function handleLeaveRoom(roomName: string, socket: Socket) {
  socket.leave(roomName);

  const chatroom = await db.findChatroom(roomName);
  if (!chatroom) return;

  chatroom.users -= 1;
  chatroom.usernames = chatroom.usernames.filter(
    (username: string) => username !== socket.id
  );
  await db.updateChatroom(roomName, chatroom);

  io.emit('user_leaves', {
    room: chatroom.name,
    username: socket.id,
    userCount: chatroom.users,
    usernames: chatroom.usernames,
  });
  //
  console.log(
    `User with ID ${socket.id} left room ${chatroom.name}. Number of users: ${chatroom.users}`
  );
  //
  if (chatroom.users < 0) {
    await db.deleteChatroom(chatroom.name);

    io.emit('update_chatrooms', await db.getAllChatrooms());
  }
}

/* disconnect */

async function handleDisconnect(socket: Socket) {
  console.log(socket)
  const chatrooms = await db.findChatroomsBySocketId(socket.id);
  for (const chatroom of chatrooms) {
    chatroom.users -= 1;
    chatroom.usernames = chatroom.usernames.filter(
      (username: string) => username !== socket.id
    );
    await db.updateChatroom(chatroom.name, chatroom);

    socket.to(chatroom.name).emit('user_geht', {
      room: chatroom.name,
      username: socket.id,
      userCount: chatroom.users,
      usernames: chatroom.usernames,
    });
    //
    console.log(
      `User with ID ${socket.id} left room ${chatroom.name}. Number of users: ${
        chatroom.users
      }. Usernames: ${chatroom.usernames.join(', ')}`
    );
    //
    if (chatroom.users < 0) {
      await db.deleteChatroom(chatroom.name);
      socket.emit('update_chatrooms', await db.getAllChatrooms());
    }
  }
}

export {
  // handleMessage,
  handleCreateRoom,
  handleJoinRoom,
  handleLeaveRoom,
  handleDisconnect,
};
