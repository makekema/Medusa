import { createContext, useEffect, useState } from "react";
import { ChatContextType, Chatroom, UserData, UserRoomList } from './ContextTypes';
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
import { Event, useSocket } from "../hooks/useSocket";

type IChatProviderProps = {
  children: React.ReactNode;
};

const ChatContext = createContext<ChatContextType | null>(null);

function ChatProvider ({ children }: IChatProviderProps) {
  const [chatrooms, setChatrooms] = useState<Chatroom[]>([]);
  const [userRoomList, setUserRoomList] = useState<UserRoomList>({ socketId: socket.id, rooms: [] });
  const events: Event[] = [
    {
      name: 'connect',
      handler: () => setUserRoomList(prevUserRoomlist => {
        console.log('Socket Connected');
        return { rooms: [...prevUserRoomlist.rooms], socketId: socket.id };
      })
    },
    {
      name: 'update_chatrooms',
      handler: (chatrooms: Chatroom[]) => {
        setChatrooms(chatrooms);
      }
    },
    {
      name: 'user_join',
      handler: (userData: UserData) => {
        setChatrooms((prevChatRooms) => updateChatrooms(prevChatRooms, userData));
        console.log(`User ${userData.username} joined the chatroom ${userData.room}. Users: ${userData.userCount}. Usernames: ${userData.usernames.join(", ")}`);
      }
    },
    {
      name: 'user_leaves',
      handler: (userData: UserData) => {
        setChatrooms((prevChatRooms) => updateChatrooms(prevChatRooms, userData));
        console.log(`User ${userData.username} left the chatroom ${userData.room}. Users: ${userData.userCount}. Usernames: ${userData.usernames.join(", ")}`);
      }
    }
  ];
  useSocket(events);

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
        room = createNewRoom(roomName, userRoomList.socketId);
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
  }, []);

  const value: ChatContextType = {
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
