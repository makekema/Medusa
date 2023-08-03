import express from 'express';
import http from 'http';
import cors from 'cors';
import socketIO from 'socket.io';
import { router } from './router.js';

const app = express();

// middleware

app.use(cors());
app.use(express.json());
app.use(router);

// socket.io

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON ${PORT}`);
});

const socketServer = http.createServer(app);

const io = socketIO(socketServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ['GET', 'POST'],
    credentials: true
  }
});

export { io };
