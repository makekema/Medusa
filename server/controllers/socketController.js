import { Chatroom } from '../models/Chatroom.js';
// import { Socket } from 'socket.io';
import { io } from '../server.js';

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  /* send message */

  socket.on("send_message", (data) => {
    console.log('message from frontend', data)
    socket.to(data.room).emit("receive_message", data)
    console.log('message to room:', data.room)
  });

  /* create room */

  // socket.on("create_room", async(roomName) => {
  //   const chatroom = new Chatroom({name: roomName});
  //   await chatroom.save();
  //   console.log(`New chatroom created: ${roomName}`)
  //   io.emit("update_chatrooms", await Chatroom.find({}))
  // })
  
  // export const handleCreateRoom = async (socket: Socket, io: Server) => {
  //   socket.on("create_room", async(roomName) => {
  //     try {
  //       const chatroom = new Chatroom({name: roomName});
  //       await chatroom.save();
  //       console.log(`New chatroom created: ${roomName}`);
        
  //       // Emit update to all connected clients
  //       io.emit("update_chatrooms", await Chatroom.find({}));
  //     } catch (error) {
  //       console.error(`Error while creating room ${roomName}:`, error);
  //     }
  //   });
  // };
  
  
  async function handleCreateRoom(roomName) {
    const chatroom = new Chatroom({name: roomName});
    await chatroom.save();
    console.log(`New chatroom created: ${roomName}`)
    const chatrooms = await Chatroom.find({});
    return chatrooms;
  }
  
  socket.on("create_room", async (roomName) => {
    const chatrooms = await handleCreateRoom(roomName);
    io.emit("update_chatrooms", chatrooms);
  });


  /* join room */

  socket.on("join_room", async (data) => {
    const chatroom = await Chatroom.findOne({name: data.name});
    if (chatroom) {
      socket.join(chatroom.name);
      chatroom.users += 1;
      chatroom.usernames.push(socket.id)
      await chatroom.save();

      io.emit("user_join", { 
        room: chatroom.name,
        username: socket.id,
        userCount: chatroom.users,
        usernames: chatroom.usernames,
      });

      console.log('chatroom.users <= 1:', chatroom.users <= 1);
      if (chatroom.users <= 1) {
        socket.emit('joined_empty_room', {
          room: chatroom.name
        });
      }
      
      console.log(`user with Id: ${socket.id} joined room: ${chatroom.name} number of users ${chatroom.users}, names of users ${chatroom.usernames}`)
    }
  })

  /* leave room */

  socket.on("leave_room", async (roomName) => {
    console.log(roomName)
    socket.leave(roomName);

    const chatroom = await Chatroom.findOne({name: roomName});
    if (chatroom) {
      chatroom.users -= 1; 
      chatroom.usernames = chatroom.usernames.filter(username => username !== socket.id); 
      await chatroom.save();

      console.log(chatroom.name, chatroom.users, chatroom.usernames)

      io.emit("user_leaves", { 
        room: chatroom.name,
        username: socket.id,
        userCount: chatroom.users,
        usernames: chatroom.usernames,
      });

      console.log(`User with ID ${socket.id} left room ${chatroom.name}. Number of users: ${chatroom.users}`);

      if (chatroom.users === 0) {
        await Chatroom.deleteOne({_id: chatroom._id}); 

        console.log(`Chatroom ${chatroom.name} has been deleted.`);
        io.emit("update_chatrooms", await Chatroom.find({})); 
      }
    }
  });

  /* disconnect */

  socket.on("disconnect", async () => {
    const chatrooms = await Chatroom.find({ usernames: socket.id });
    for (const chatroom of chatrooms) {
      chatroom.users -= 1;
      chatroom.usernames = chatroom.usernames.filter(username => username !== socket.id);
      await chatroom.save();

      io.to(chatroom.name).emit("user_geht", { 
        room: chatroom.name,
        username: socket.id,
        userCount: chatroom.users,
        usernames: chatroom.usernames,
      });

      console.log(`User with ID ${socket.id} left room ${chatroom.name}. Number of users: ${chatroom.users}. Usernames: ${chatroom.usernames.join(", ")}`);
      
      if (chatroom.users === 0) {
        await Chatroom.deleteOne({_id: chatroom._id}); 

        console.log(`Chatroom ${chatroom.name} has been deleted.`);
        io.emit("update_chatrooms", await Chatroom.find({})); 
      }
    }
    console.log(`User disconnected: ${socket.id}`);
  });

});
