import { Dispatch, SetStateAction } from "react";

export type UserData = {
  username: string,
  usernames: [],
  userCount: number,
  room: string;
};

export type UserRoomList = {
  rooms: Chatroom[];
  socketId: string;
};

export type Chatroom = {
  name: string,
  usernames: string[],
  users: number,
  creator: string,
};

export type ChatContextType = {
  chatrooms: Chatroom[];
  setChatrooms: Dispatch<SetStateAction<Chatroom[]>>;
  userRoomList: UserRoomList;
  setUserRoomList: Dispatch<SetStateAction<UserRoomList>>;
  joinRoom: (roomName: string) => void;
  leaveRoom: (roomName: string) => void;
};