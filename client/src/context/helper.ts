import { Chatroom, Message, UserData, UserRoomList } from "./ContextTypes";

export const isUserAlreadyInTheRoom = (userRoomList: UserRoomList, roomName: string) => {
  const room = userRoomList.rooms.find((room) => { if (room.name === roomName) return room; });
  return room;
};

export function createNewRoom (roomName: string, creator: string) {
  return {
    name: roomName,
    usernames: [],
    users: 0,
    creator,
  };
}

export function createNewMessage (user: string, message: string, roomName: string): Message {
  return {
    user, roomName, message,
    time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
  };
}

export const getChatroomFromChatrooms = (chatrooms: Chatroom[], roomName: string) => {
  const room = chatrooms.find((room) => { if (room.name === roomName) return room; });
  return room;
};

export const removeRoomFromUserRoomListState = (roomList: UserRoomList, roomName: string) => {
  const updatedRooms = roomList.rooms.filter(
    (r) => r.name !== roomName
  );
  const updatedRoomList = { ...roomList };
  updatedRoomList.rooms = [...updatedRooms];
  return updatedRoomList;
};

export const addRoomToUserRoomListState = (roomList: UserRoomList, room: Chatroom) => {
  const updatedRooms = [
    ...roomList.rooms, room,
  ];
  const updatedRoomList = { ...roomList };
  updatedRoomList.rooms = [...updatedRooms];
  return updatedRoomList;
};

export const updateChatrooms = (chatrooms: Chatroom[], userData: UserData) => {
  return chatrooms.map((chatroom) => {
    if (chatroom.name === userData.room) {
      return {
        ...chatroom,
        users: userData.userCount,
        usernames: userData.usernames,
      };
    }
    return chatroom;
  });
};

export const DEFAULT_MESSAGE = "Congrats, you are the first user that came up with this brilliant topic. Feel free, to wait for others to join you and in the meantime, maybe inspire yourself with what your friends talk about.";