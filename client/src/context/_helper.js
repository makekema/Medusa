export const isUserAlreadyInTheRoom = (userRoomList, roomName) => {
  const room = userRoomList.rooms.find((room) => { if (room.name === roomName) return room; });
  return room;
};

export function createNewRoom (roomName, creator) {
  return {
    name: roomName,
    usernames: [],
    users: 0,
    creator,
  };
}

export const getChatroomFromChatrooms = (chatrooms, roomName) => {
  const room = chatrooms.find((room) => { if (room.name === roomName) return room; });
  return room;
};

export const removeRoomFromUserRoomListState = (roomList, roomName) => {
  const updatedRooms = roomList.rooms.filter(
    (r) => r.name !== roomName
  );
  const updatedRoomList = { ...roomList };
  updatedRoomList.rooms = [...updatedRooms];
  return updatedRoomList;
};

export const addRoomToUserRoomListState = (roomList, room) => {
  const updatedRooms = [
    ...roomList.rooms, room,
  ];
  const updatedRoomList = { ...roomList };
  updatedRoomList.rooms = [...updatedRooms];
  return updatedRoomList;
};

export const updateChatrooms = (chatrooms, userData) => {
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