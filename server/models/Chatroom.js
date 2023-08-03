import { mongoose } from './index.js';

const chatroomSchema = new mongoose.Schema({
  name: String,
  users: { type: Number, default: 0 },
  usernames: { type: [String], default: [] }
});

const Chatroom = mongoose.model('Chatroom', chatroomSchema);

export { Chatroom };
