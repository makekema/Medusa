import { Chatroom, UserData, UserRoomList } from './ContextTypes';

export const isUserAlreadyInTheRoom = (
  userRoomList: UserRoomList,
  roomName: string
) => {
  return userRoomList.rooms.find((room) => room.name === roomName);
};

export function createNewRoom(roomName: string, creator: string) {
  return {
    name: roomName,
    usernames: [],
    users: 0,
    creator,
  };
}

export const getChatroomFromChatrooms = (
  chatrooms: Chatroom[],
  roomName: string
) => {
  const room = chatrooms.find(room => room.name === roomName);
  return room;
};

export const removeRoomFromUserRoomListState = (
  roomList: UserRoomList,
  roomName: string
) => {
  const updatedRooms = roomList.rooms.filter((r) => r.name !== roomName);
  const updatedRoomList = { ...roomList };
  updatedRoomList.rooms = [...updatedRooms];
  return updatedRoomList;
};

export const addRoomToUserRoomListState = (
  roomList: UserRoomList,
  room: Chatroom
) => {
  const updatedRooms = [...roomList.rooms, room];
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
