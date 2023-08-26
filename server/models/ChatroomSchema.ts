import { mongoose } from './index';


const chatroomSchema: mongoose.Schema = new mongoose.Schema({
  name: { type: String, required: true },
  users: { type: Number, default: 0 },
  usernames: { type: [String], default: [] },
  creator: {type: String}
});

const Chatroom = mongoose.model('Chatroom', chatroomSchema);


export { Chatroom };