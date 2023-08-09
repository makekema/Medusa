import { Message, UserData, ChatRoom } from '../models/types';

const mockMessage: Message = {
  user: "John Doe",
  roomName: "testRoom",
  message: "Hello, World!",
  time: "2023-08-07T12:34:56.789Z",
};

const mockUserData: UserData = {
  username: "John Doe",
  usernames: ["John Doe", "Jane Doe"],
  userCount: 2,
  room: "testRoom",
};

const mockChatRoom: ChatRoom = {
  name: "testRoom_kn5j908jrgrjopg36khg",
  users: 2,
  usernames: ["John Doe", "Jane Doe"],
  creator: "Admin",
};

export { mockMessage, mockUserData, mockChatRoom };