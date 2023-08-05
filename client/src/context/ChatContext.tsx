import { createContext, useEffect, useState } from "react";
import { ChatContext, Chatroom, UserData, UserRoomList } from './ContextTypes';
import { http } from '../apiService';
import {
  createNewRoom,
  isUserAlreadyInTheRoom,
  removeRoomFromUserRoomListState,
  addRoomToUserRoomListState,
  getChatroomFromChatrooms,
  updateChatrooms
} from "./helper";
import { socket } from "../socket";

type IChatProviderProps = {
  children: React.ReactNode;
};

const ChatContext = createContext<ChatContext | null>(null);

function ChatProvider ({ children }: IChatProviderProps) {
  const [chatrooms, setChatrooms] = useState<Chatroom[]>([]);
  const [userRoomList, setUserRoomList] = useState<UserRoomList>({ socketId: socket.id, rooms: [] });

  // SELECTOR
  const [isSelectorVisible, setSelectorVisible] = useState(true);
  const [isSelectorClosed, setSelectorClosed] = useState(false);

  const joinRoom = (roomName: string) => {
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
        return addRoomToUserRoomListState(prevRoomList, room!);
      });
    }
  };
  const leaveRoom = (roomName: string) => {
    socket.emit("leave_room", roomName);

    setUserRoomList((prevRoomList) => {
      return removeRoomFromUserRoomListState(prevRoomList, roomName);
    });
  };

  useEffect(() => {
    http.getChatRooms().then((chatrooms: Chatroom[]) => {
      setChatrooms(chatrooms);
    });
    socket.on("update_chatrooms", (chatrooms: Chatroom[]) => {
      setChatrooms(chatrooms);
    });
    return () => {
      socket.off('update_chatrooms');
    };
  }, []);

  useEffect(() => {
    socket.on("user_join", (userData: UserData) => {
      setChatrooms((prevChatRooms) => updateChatrooms(prevChatRooms, userData));
      console.log(`User ${userData.username} joined the chatroom ${userData.room}. Users: ${userData.userCount}. Usernames: ${userData.usernames.join(", ")}`);
    });

    return () => {
      socket.off("user_join");
    };
  }, [chatrooms]);

  useEffect(() => {
    socket.on("user_leaves", (userData: UserData) => {
      setChatrooms((prevChatRooms) => updateChatrooms(prevChatRooms, userData));
      console.log(`User ${userData.username} left the chatroom ${userData.room}. Users: ${userData.userCount}. Usernames: ${userData.usernames.join(", ")}`);
    });

    return () => {
      socket.off("user_leaves");
    };
  }, [chatrooms]);

  const value: ChatContext = {
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
