import express, { Express } from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import { router } from './router';
import dotenv from 'dotenv';


const app: Express = express();

// environmental variables

dotenv.config();

const ORIGIN =  "http://localhost:3000"; // process.env.ORIGIN! //
const PORT =  3001; // Number(process.env.PORT)! //

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
    methods: ['GET', 'POST']
    // credentials: true
  }
});

import {ioConnect} from './controllers/socketListeners';
ioConnect(io);

// server

httpServer.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON ${PORT}`);
});


export { io }
