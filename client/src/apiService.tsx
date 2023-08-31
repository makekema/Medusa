import { Chatroom } from "./context/ContextTypes";

const API = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : 'https://medusa.fly.dev'

// const SERVER_URL = 'http://localhost:3001';

export const http = {
  getChatRooms: async (): Promise<Chatroom[]> => {
    try {
      const response = await fetch(`${API}/chatrooms`);
      const chatrooms = await response.json();
      return chatrooms;
    } catch (err) {
      console.error(err);
      return [];
    }
  }
};