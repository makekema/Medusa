import { Chatroom } from './ChatroomSchema';
import { Room } from '../types/Room'


const db = {

  getAllChatrooms: async (): Promise<Room[]> => {
    return Chatroom.find({});
  },

  createChatroom: async (name: string): Promise<void> => {
    await Chatroom.create({ name });
  },

  findChatroom: async (name: string): Promise<Room | null> => {
    return Chatroom.findOne({ name });
  },

  deleteChatroom: async (name: string): Promise<void> => {
    await Chatroom.deleteOne({ name });
  },

  updateChatroom: async (name: string, updatedData: Partial<Room>): Promise<void> => {
    await Chatroom.updateOne({ name }, { $set: updatedData });
  }

}


export { db };
