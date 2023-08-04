import io from "socket.io-client";
import { createContext, useEffect, useState } from "react";
import { http } from '../apiService';
import { createNewRoom } from "../utils";

const ChatContext = createContext();
const socket = io.connect("http://localhost:3001");

function ChatProvider ({ children }) {
  const [roomName, setRoomName] = useState("");
  const [chatrooms, setChatrooms] = useState([]);
  const [userRoomList, setUserRoomList] = useState({ socketId: socket.id, rooms: [] });

  const room = createNewRoom(roomName, socket.id);

  // SELECTOR
  const [isSelectorVisible, setSelectorVisible] = useState(true);
  const [isSelectorClosed, setSelectorClosed] = useState(false);

  // FUNCTIONS
  const joinRoom = () => {
    if (roomName !== "") {
      const userAlreadyInRoom = userRoomList.rooms?.some((r) => r.name === roomName);
      if (userAlreadyInRoom) {
        console.log("You are already in this room");
        return;
      }
      const existingRoom = chatrooms.some((c) => c.name === roomName);
      if (!existingRoom) {
        socket.emit("create_room", roomName);
      }
      socket.emit("join_room", roomName);
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
  };

  const leaveRoom = (roomName) => {
    socket.emit("leave_room", roomName);
    setUserRoomList((prevRoomList) => {
      const updatedRooms = prevRoomList.rooms.filter(
        (r) => r.name !== roomName
      );
      const updatedRoomList = { ...prevRoomList };
      updatedRoomList.rooms = [...updatedRooms];
      console.log('roomList: ', updatedRoomList);
      return updatedRoomList;
    });
  };

  // UPDATE CHATRROMS
  useEffect(() => {
    socket.on("update_chatrooms", (chatrooms) => {
      console.log('chatrooms: ', chatrooms);
      setChatrooms(chatrooms);
    });
    return () => {
      socket.off("update_chatrooms");
    };
  }, []);

  // USER JOIN
  useEffect(() => {
    socket.on("user_join", (userData) => {
      const updatedChatrooms = chatrooms.map((chatroom) => {
        if (chatroom.name === userData.room) {
          return {
            ...chatroom,
            users: userData.userCount,
            usernames: userData.usernames,
          };
        } else {
          return chatroom;
        }
      });
      setChatrooms(updatedChatrooms);
      console.log(`User ${userData.username} joined the chatroom ${userData.room}. Users: ${userData.userCount}. Usernames: ${userData.usernames.join(", ")}`);
    });

    return () => {
      socket.off("user_join");
    };
  }, [chatrooms]);

  // USER LEAVE
  useEffect(() => {
    socket.on("user_leaves", (userData) => {
      const updatedChatrooms = chatrooms.map((chatroom) => {
        if (chatroom.name === userData.room) {
          return {
            ...chatroom,
            users: userData.userCount,
            usernames: userData.usernames,
          };
        } else {
          return chatroom;
        }
      });
      setChatrooms(updatedChatrooms);
      console.log(`User ${userData.username} left the chatroom ${userData.room}. Users: ${userData.userCount}. Usernames: ${userData.usernames.join(", ")}`);
    });

    return () => {
      socket.off("user_leaves");
    };
  }, [chatrooms]);

  // GET ALL
  useEffect(() => {
    http.getChatRooms().then(chatrooms => {
      setChatrooms(chatrooms);
    });
  }, []);

  const value = {
    socket,
    roomName,
    setRoomName,
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

  return (
    < ChatContext.Provider value={value} >
      {children}
    </ ChatContext.Provider>
  );
}

export { ChatContext, ChatProvider };