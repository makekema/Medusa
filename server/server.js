"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const router_js_1 = require("./router.js");
const app = (0, express_1.default)();
// express middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(router_js_1.router);
// create HTTP server with express app
// -> socket.io requires an HTTP server to attach to
const httpServer = http_1.default.createServer(app);
// socket.io
// -> origin defines the frontend connection
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST'],
        credentials: true
    }
});
exports.io = io;
// server
const PORT = 3001;
httpServer.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON ${PORT}`);
});
