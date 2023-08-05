import { createContext, useEffect, useState } from 'react';
import { socket } from '../socket';

const MessageContext = createContext();
function MessageProvider ({ children }) {
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async (room, message) => {
    if (room !== "") {
      const messageData = {
        user: socket.id,
        room: room,
        message: message,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
        sender: "me",
        socketId: socket.id
      };
      if (message !== "") {
        socket.emit("send_message", messageData);
        console.log('message sent:', messageData);
        setMessageList((list) => [...list, messageData]);
      }
    }
  };

  // Sockets
  useEffect(() => {
    socket.on('connect', () => console.log("Socket Connected"));
    socket.on("receive_message", (data) => {
      console.log('message received', data);
      const messageData = {
        ...data,
        sender: data.user === socket.id ? "me" : "other"
      };
      setMessageList((list) => [...list, messageData]);
      console.log('messageList', messageList);
    });

    socket.on('joined_empty_room', (data) => {
      console.log('joined_empty_room:', socket.id);
      const messageData = {
        user: socket.id,
        room: data.room,
        message: "Congrats, you are the first user that came up with this brilliant topic. Feel free, to wait for others to join you and in the meantime, maybe inspire yourself with what your friends talk about. ",
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
        sender: "me",
        socketId: socket.id,
      };
      setMessageList((list) => [...list, messageData]);
    }, []);

    return () => {
      socket.off('connect');
      socket.off("receive_message");
      socket.off("joined_empty_room");
    };

  }, []);

  const value = {
    messageList,
    setMessageList,
    sendMessage,
  };

  return (
    < MessageContext.Provider value={value} >
      {children}
    </ MessageContext.Provider>
  );
}

export { MessageContext, MessageProvider };
