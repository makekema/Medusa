import express, { Express } from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import { router } from './router';
import dotenv from 'dotenv';


const app: Express = express();

// express middleware

app.use(cors());
app.use(express.json());
app.use(router);

// create HTTP server with express app
// -> socket.io requires an HTTP server to attach to

const httpServer: http.Server = http.createServer(app);

// socket.io
// -> origin defines the frontend connection

const io: Server = new Server(httpServer, {
  cors: {
    origin: process.env.ORIGIN, // origin: "http://localhost:3000",
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// server

const PORT: number = Number(process.env.PORT)!

httpServer.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON ${PORT}`);
});


export { io }