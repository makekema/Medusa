import { Chatroom } from '../models/Chatroom.js';


/* send_message */

async function handleMessage(data) {
  //console.log('message from frontend', data);
  io.to(data.room).emit("receive_message", data);
  //console.log('message to room:', data.room);
}


/* create_room */

async function handleCreateRoom(roomName) {
  const chatroom = new Chatroom({name: roomName});
  await chatroom.save();
  //console.log(`New chatroom created: ${roomName}`)
  const chatrooms = await Chatroom.find({});
  return chatrooms;
}


/* join_room */

async function handleJoinRoom(data) {
  const chatroom = await Chatroom.findOne({name: data.name});
  if (!chatroom) return;

  socket.join(chatroom.name);
  chatroom.users += 1;
  chatroom.usernames.push(socket.id);
  await chatroom.save();

  io.emit("user_join", { 
    room: chatroom.name,
    username: socket.id,
    userCount: chatroom.users,
    usernames: chatroom.usernames,
  });

  //console.log('chatroom.users <= 1:', chatroom.users <= 1);
  if (chatroom.users <= 1) {
    socket.emit('joined_empty_room', {
      room: chatroom.name
    });
  }
  
  //console.log(`user with Id: ${socket.id} joined room: ${chatroom.name} number of users ${chatroom.users}, names of users ${chatroom.usernames}`);
}


/* leave_room */

async function handleLeaveRoom(roomName) {
  //console.log(roomName);
  socket.leave(roomName);

  const chatroom = await Chatroom.findOne({name: roomName});
  if (!chatroom) return;

  chatroom.users -= 1;
  chatroom.usernames = chatroom.usernames.filter(username => username !== socket.id);
  await chatroom.save();

  //console.log(chatroom.name, chatroom.users, chatroom.usernames);

  io.emit("user_leaves", {
    room: chatroom.name,
    username: socket.id,
    userCount: chatroom.users,
    usernames: chatroom.usernames,
  });

  //console.log(`User with ID ${socket.id} left room ${chatroom.name}. Number of users: ${chatroom.users}`);

  // if (chatroom.users === 0) {
  // changed to:
  if (chatroom.users < 0) {
    await Chatroom.deleteOne({_id: chatroom._id});

    //console.log(`Chatroom ${chatroom.name} has been deleted.`);
    io.emit("update_chatrooms", await Chatroom.find({}));
  }
}


/* disconnect */

async function handleDisconnect(socket) {
  const chatrooms = await Chatroom.find({ usernames: socket.id });
  for (const chatroom of chatrooms) {
    chatroom.users -= 1;
    chatroom.usernames = chatroom.usernames.filter(username => username !== socket.id);
    await chatroom.save();

    socket.to(chatroom.name).emit("user_geht", {
      room: chatroom.name,
      username: socket.id,
      userCount: chatroom.users,
      usernames: chatroom.usernames,
    });

    console.log(`User with ID ${socket.id} left room ${chatroom.name}. Number of users: ${chatroom.users}. Usernames: ${chatroom.usernames.join(", ")}`);
    
    if (chatroom.users < 0) {
      await Chatroom.deleteOne({_id: chatroom._id}); 

      //console.log(`Chatroom ${chatroom.name} has been deleted.`);
      socket.emit("update_chatrooms", await Chatroom.find({})); 
    }
  }
  //console.log(`User disconnected: ${socket.id}`);
}


export {
  handleMessage,
  handleCreateRoom,
  handleJoinRoom,
  handleLeaveRoom,
  handleDisconnect
}