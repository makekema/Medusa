import express, { Router } from 'express';
import { createChatroom, findChatrooms } from './controllers/chatrooms';

const router: Router = express.Router();

router.post('/chatrooms', createChatroom);

router.get('/chatrooms', findChatrooms);

export { router };
