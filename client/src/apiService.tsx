import { Chatroom } from "./context/ContextTypes";

const SERVER_URL = 'http://localhost:3001';

export const http = {
  getChatRooms: async (): Promise<Chatroom[]> => {
    try {
      const response = await fetch(`${SERVER_URL}/chatrooms`);
      const chatrooms = await response.json();
      return chatrooms;
    } catch (err) {
      console.error(err);
      return [];
    }
  }
};