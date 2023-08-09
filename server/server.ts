import express, { Express } from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import { router } from './router';
import dotenv from 'dotenv';
import {ioConnect} from './controllers/socketListeners';
import { ErrorHandler } from './middlewares/errorHandler';


const app: Express = express();

dotenv.config();

const ORIGIN: string = String(process.env.ORIGIN!);
const PORT: string = String(process.env.PORT!);


app.use(cors());
app.use(express.json());
app.use(router);
app.use(ErrorHandler);

const httpServer: http.Server = http.createServer(app);

const io: Server = new Server(httpServer, {
  cors: {
    origin: ORIGIN,
    methods: ['GET', 'POST']
  }
});

ioConnect(io);

httpServer.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON ${PORT}`);
});


export { io, app, httpServer };