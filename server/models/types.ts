export type Message = {
  user: string;
  roomName: string;
  message: string;
  time: string;
};

export type UserData = {
  username: string;
  usernames: [];
  userCount: number;
  room: string;
};

export type ChatRoom = {
  name: string;
  users: number;
  usernames: string[];
  creator: string;
};
