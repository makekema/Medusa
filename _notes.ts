interface RoomData {
  name: string;
  time: string;
  creator: string;
}

interface MessageSent {
  user: string;
  room: string;
  message: string;
  time: string;
  sender: string;
  socketId: string;
}