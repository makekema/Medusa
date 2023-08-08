import { Message } from "./types";

export function createNewMessage (user: string, message: string, roomName: string): Message {
  return {
    user, roomName, message,
    time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
  };
}

export const DEFAULT_MESSAGE = "Congrats, you are the first user that came up with this brilliant topic. Feel free, to wait for others to join you and in the meantime, maybe inspire yourself with what your friends talk about.";