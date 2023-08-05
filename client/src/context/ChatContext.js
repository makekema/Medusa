import io from "socket.io-client";
import { createContext, useEffect, useState } from "react";
import { http } from '../apiService';
import {
  createNewRoom,
  isUserAlreadyInTheRoom,
  removeRoomFromUserRoomListState,
  addRoomToUserRoomListState,
  getChatroomFromChatrooms,
  updateChatrooms
} from "./helper";

const ChatContext = createContext();
const socket = io.connect('http://localhost:3001');

function ChatProvider ({ children }) {
  const [chatrooms, setChatrooms] = useState([]);
  const [userRoomList, setUserRoomList] = useState({ socketId: socket.id, rooms: [] });

  // SELECTOR
  const [isSelectorVisible, setSelectorVisible] = useState(true);
  const [isSelectorClosed, setSelectorClosed] = useState(false);

  // FUNCTIONS
  const joinRoom = (roomName) => {
    if (roomName !== "") {
      if (isUserAlreadyInTheRoom(userRoomList, roomName)) {
        console.log("You are already in this room");
        return;
      }

      let room = getChatroomFromChatrooms(chatrooms, roomName);

      if (!room) {
        socket.emit("create_room", roomName);
        room = createNewRoom(roomName, socket.id);
      }
      socket.emit("join_room", roomName);

      setUserRoomList((prevRoomList) => {
        return addRoomToUserRoomListState(prevRoomList, room);
      });
    }
  };

  const leaveRoom = (roomName) => {
    socket.emit("leave_room", roomName);

    setUserRoomList((prevRoomList) => {
      return removeRoomFromUserRoomListState(prevRoomList, roomName);
    });
  };

  // SOCKETS
  useEffect(() => {
    http.getChatRooms().then(chatrooms => {
      setChatrooms(chatrooms);
    });

    socket.on("update_chatrooms", (chatrooms) => {
      setChatrooms(chatrooms);
    });

    return () => {
      socket.off('update_chatrooms');
    };
  }, []);

  useEffect(() => {
    socket.on("user_join", (userData) => {
      setChatrooms((prevChatRooms) => updateChatrooms(prevChatRooms, userData));
      console.log(`User ${userData.username} joined the chatroom ${userData.room}. Users: ${userData.userCount}. Usernames: ${userData.usernames.join(", ")}`);
    });

    socket.on("user_leaves", (userData) => {
      setChatrooms((prevChatRooms) => updateChatrooms(prevChatRooms, userData));
      console.log(`User ${userData.username} left the chatroom ${userData.room}. Users: ${userData.userCount}. Usernames: ${userData.usernames.join(", ")}`);
    });

    return () => {
      socket.off("user_join");
      socket.off("user_leaves");
    };
  }, [chatrooms]);

  const value = {
    socket,
    chatrooms,
    setChatrooms,
    userRoomList,
    setUserRoomList,
    leaveRoom,
    joinRoom,
    // //These have to go in their own slice
    setSelectorClosed,
    setSelectorVisible,
    isSelectorClosed,
    isSelectorVisible,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export { ChatContext, ChatProvider };