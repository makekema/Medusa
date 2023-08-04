import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import { router } from './router.js';


const app = express();

// express middleware

app.use(cors());
app.use(express.json());
app.use(router);

// create HTTP server with express app
// -> socket.io requires an HTTP server to attach to

const httpServer = http.createServer(app);

// socket.io
// -> origin defines the frontend connection

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// server

const PORT = 3001;

httpServer.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON ${PORT}`);
});


export { io }