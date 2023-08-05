export const isUserAlreadyInTheRoom = (userRoomList, roomName) => {
  console.log("🚀 ~ file: helper.js:2 ~ isUserAlreadyInTheRoom ~ userRoomList:", userRoomList);
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
  console.log("🚀 ~ file: helper.js:15 ~ getChatroomFromChatrooms ~ rooms:", room);
  return room;
};

export const removeRoomFromUserRoomListState = (roomList, roomName) => {
  const updatedRooms = roomList.rooms.filter(
    (r) => r.name !== roomName
  );
  const updatedRoomList = { ...roomList };
  updatedRoomList.rooms = [...updatedRooms];
  console.log('roomList: ', updatedRoomList);
  return updatedRoomList;
};

export const addRoomToUserRoomListState = (roomList, room) => {
  const updatedRooms = [
    ...roomList.rooms, room,
  ];
  const updatedRoomList = { ...roomList };
  updatedRoomList.rooms = [...updatedRooms];
  console.log('roomList: ', updatedRoomList);
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