"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chatroom = void 0;
const index_js_1 = require("./index.js");
const chatroomSchema = new index_js_1.mongoose.Schema({
    name: String,
    users: { type: Number, default: 0 },
    usernames: { type: [String], default: [] }
});
const Chatroom = index_js_1.mongoose.model('Chatroom', chatroomSchema);
exports.Chatroom = Chatroom;
