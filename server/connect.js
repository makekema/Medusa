// const express = require("express");

const http = require("http");

const { Server } = require("socket.io");

const app = require('./server.js');

// const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

module.exports = io;