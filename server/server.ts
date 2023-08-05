import express, { Express } from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import { router } from './router';
import dotenv from 'dotenv';


const app: Express = express();

// environmental variables

dotenv.config();

const ORIGIN = process.env.ORIGIN! // "http://localhost:3000";
const PORT = Number(process.env.PORT)! // 3001;

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
    origin: ORIGIN,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// server

httpServer.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON ${PORT}`);
});


export { io }
