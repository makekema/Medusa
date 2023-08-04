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
exports.findChatrooms = exports.createChatroom = void 0;
const Chatroom_js_1 = require("../models/Chatroom.js");
/* GET */
const createChatroom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const chatroom = new Chatroom_js_1.Chatroom({ name });
        yield chatroom.save();
        res.status(201).json(chatroom);
    }
    catch (err) {
        next(err);
    }
});
exports.createChatroom = createChatroom;
/* POST */
const findChatrooms = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chatrooms = yield Chatroom_js_1.Chatroom.find({});
        res.status(200).json(chatrooms);
    }
    catch (err) {
        next(err);
    }
});
exports.findChatrooms = findChatrooms;
