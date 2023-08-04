import { createContext, useEffect, useState } from "react";
import { ChatContext } from "./ChatContext";
import { useContext } from "react";
import { createNewRoom } from "../utils";

const MessageContext = createContext();

function MessageProvider ({ children }) {

  const { socket, setRoomName, userRoomList, setUserRoomList } = useContext(ChatContext);

  // DEFINITIONS

  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);


  // MESSAGE FUNCTIONALITY

  function handleRoomButtonClick (roomName) {
    const existingRoom = userRoomList.rooms?.some((r) => r.name === roomName);
    if (existingRoom) {
      console.log("You are already in this room.");
      return;
    }

    setRoomName(roomName);
    const room = createNewRoom(roomName, socket.id);
    console.log("Room Data from RoomList:", room);
    socket.emit("join_room", room);

    setUserRoomList((prevRoomList) => {
      const updatedRooms = [
        ...prevRoomList.rooms, room,
      ];
      const updatedRoomList = { ...prevRoomList };
      updatedRoomList.rooms = [...updatedRooms];
      console.log('roomList: ', updatedRoomList);
      return updatedRoomList;
    });

  }


  const sendMessage = async (room) => {
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
        await socket.emit("send_message", messageData);
        console.log('message sent:', messageData);
        setMessageList((list) => [...list, messageData]);
        setMessage("");
      }
    }
  };

  // USE EFFECTS
  // RECEIVE MESSAGE & JOIN EMPTY ROOM

  useEffect(() => {
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
    });

    return () => {
      socket.off("receive_message");
      socket.off("joined_empty_room");
    };

  }, []);


  // TEST LOGS

  // useEffect(() => {
  //   console.log('messageList:', messageList);
  // }, [messageList]);

  const value = {
    message,
    setMessage,
    messageList,
    setMessageList,
    sendMessage,
    handleRoomButtonClick
  };

  return (
    < MessageContext.Provider value={value} >
      {children}
    </ MessageContext.Provider>
  );
}

export { MessageContext, MessageProvider };