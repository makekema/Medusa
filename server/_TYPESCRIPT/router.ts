import express from 'express';
import { createChatroom, findChatrooms } from './controllers/chatrooms.js';


const router = express.Router();

/* respond to HTTP requests */

router.post('/chatrooms', createChatroom);

router.get('/chatrooms', findChatrooms);


export { router };
