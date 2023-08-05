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
const server_js_1 = require("../server.js");
const socketHandlers_js_1 = require("./socketHandlers.js");
server_js_1.io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    socket.on("send_message", (data) => {
        (0, socketHandlers_js_1.handleMessage)(data);
    });
    socket.on("create_room", (roomName) => __awaiter(void 0, void 0, void 0, function* () {
        const chatrooms = yield (0, socketHandlers_js_1.handleCreateRoom)(roomName);
        server_js_1.io.emit("update_chatrooms", chatrooms);
    }));
    socket.on("join_room", (data) => {
        (0, socketHandlers_js_1.handleJoinRoom)(data);
    });
    socket.on("leave_room", (roomName) => {
        (0, socketHandlers_js_1.handleLeaveRoom)(roomName);
    });
    socket.on("disconnect", () => {
        (0, socketHandlers_js_1.handleDisconnect)(socket);
    });
});
