"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDisconnect = exports.handleLeaveRoom = exports.handleJoinRoom = exports.handleCreateRoom = exports.handleMessage = void 0;
const Chatroom_js_1 = require("../models/Chatroom.js");
/* send_message */
function handleMessage(data) {
    return __awaiter(this, void 0, void 0, function* () {
        //console.log('message from frontend', data);
        io.to(data.room).emit("receive_message", data);
        //console.log('message to room:', data.room);
    });
}
exports.handleMessage = handleMessage;
/* create_room */
function handleCreateRoom(roomName) {
    return __awaiter(this, void 0, void 0, function* () {
        const chatroom = new Chatroom_js_1.Chatroom({ name: roomName });
        yield chatroom.save();
        //console.log(`New chatroom created: ${roomName}`)
        const chatrooms = yield Chatroom_js_1.Chatroom.find({});
        return chatrooms;
    });
}
exports.handleCreateRoom = handleCreateRoom;
/* join_room */
function handleJoinRoom(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const chatroom = yield Chatroom_js_1.Chatroom.findOne({ name: data.name });
        if (!chatroom)
            return;
        socket.join(chatroom.name);
        chatroom.users += 1;
        chatroom.usernames.push(socket.id);
        yield chatroom.save();
        io.emit("user_join", {
            room: chatroom.name,
            username: socket.id,
            userCount: chatroom.users,
            usernames: chatroom.usernames,
        });
        //console.log('chatroom.users <= 1:', chatroom.users <= 1);
        if (chatroom.users <= 1) {
            socket.emit('joined_empty_room', {
                room: chatroom.name
            });
        }
        //console.log(`user with Id: ${socket.id} joined room: ${chatroom.name} number of users ${chatroom.users}, names of users ${chatroom.usernames}`);
    });
}
exports.handleJoinRoom = handleJoinRoom;
/* leave_room */
function handleLeaveRoom(roomName) {
    return __awaiter(this, void 0, void 0, function* () {
        //console.log(roomName);
        socket.leave(roomName);
        const chatroom = yield Chatroom_js_1.Chatroom.findOne({ name: roomName });
        if (!chatroom)
            return;
        chatroom.users -= 1;
        chatroom.usernames = chatroom.usernames.filter(username => username !== socket.id);
        yield chatroom.save();
        //console.log(chatroom.name, chatroom.users, chatroom.usernames);
        io.emit("user_leaves", {
            room: chatroom.name,
            username: socket.id,
            userCount: chatroom.users,
            usernames: chatroom.usernames,
        });
        //console.log(`User with ID ${socket.id} left room ${chatroom.name}. Number of users: ${chatroom.users}`);
        // if (chatroom.users === 0) {
        // changed to:
        if (chatroom.users < 0) {
            yield Chatroom_js_1.Chatroom.deleteOne({ _id: chatroom._id });
            //console.log(`Chatroom ${chatroom.name} has been deleted.`);
            io.emit("update_chatrooms", yield Chatroom_js_1.Chatroom.find({}));
        }
    });
}
exports.handleLeaveRoom = handleLeaveRoom;
/* disconnect */
function handleDisconnect(socket) {
    return __awaiter(this, void 0, void 0, function* () {
        const chatrooms = yield Chatroom_js_1.Chatroom.find({ usernames: socket.id });
        for (const chatroom of chatrooms) {
            chatroom.users -= 1;
            chatroom.usernames = chatroom.usernames.filter(username => username !== socket.id);
            yield chatroom.save();
            socket.to(chatroom.name).emit("user_geht", {
                room: chatroom.name,
                username: socket.id,
                userCount: chatroom.users,
                usernames: chatroom.usernames,
            });
            //console.log(`User with ID ${socket.id} left room ${chatroom.name}. Number of users: ${chatroom.users}. Usernames: ${chatroom.usernames.join(", ")}`);
            if (chatroom.users === 0) {
                yield Chatroom_js_1.Chatroom.deleteOne({ _id: chatroom._id });
                //console.log(`Chatroom ${chatroom.name} has been deleted.`);
                socket.emit("update_chatrooms", yield Chatroom_js_1.Chatroom.find({}));
            }
        }
        //console.log(`User disconnected: ${socket.id}`);
    });
}
exports.handleDisconnect = handleDisconnect;
