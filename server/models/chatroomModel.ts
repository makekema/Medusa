import { Chatroom } from './ChatroomSchema';
import { ChatRoom } from './types';

const db = {
  getAllChatrooms: async (): Promise<ChatRoom[]> => {
    return Chatroom.find({});
  },

  findChatroomsBySocketId: async (socketId: string): Promise<ChatRoom[]> => {
    return Chatroom.find({ usernames: socketId });
  },

  findChatroom: async (name: string): Promise<ChatRoom | null> => {
    return Chatroom.findOne({ name });
  },

  createChatroom: async (chatroom: ChatRoom): Promise<void> => {
    await Chatroom.create(chatroom);
  },

  deleteChatroom: async (id: string): Promise<void> => {
    await Chatroom.deleteOne({ _id: id });
  },

  updateChatroom: async (
    name: string,
    updatedData: Partial<ChatRoom>
  ): Promise<void> => {
    await Chatroom.updateOne({ name }, { $set: updatedData });
  },
};

export { db };
