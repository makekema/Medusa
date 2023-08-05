import { Chatroom } from './ChatroomSchema';
import { Room } from '../types/Room'


const db = {

  getAllChatrooms: async (): Promise<Room[]> => {
    return await Chatroom.find({});
  },

  saveChatroom: async (name: string): Promise<void> => {
    const newRoom = new Chatroom({ name });
    await newRoom.save();
  },

  findChatroom: async (name: string): Promise<Room | null> => {
    const chatroom = await Chatroom.findOne<Room>({ name });
    return chatroom || null;
  },

  deleteChatroom: async (name: string): Promise<void> => {
    await Chatroom.deleteOne({ name });
  },

  updateChatroom: async (name: string, updatedData: Partial<Room>): Promise<void> => {
    await Chatroom.updateOne({ name }, { $set: updatedData });
  }

}


export { db };


// updateChatroom: async (name: string): Promise<void> {
//   const chatrooms = dbConnection.collection('chatrooms');

//   try {
//       await chatrooms.updateOne(
//           { name: roomName },
//           { $set: updatedChatroomData }
//       );
//   } catch (err) {
//       console.error('Error updating chatroom:', err.message);
//       throw err;
//   }
// }
