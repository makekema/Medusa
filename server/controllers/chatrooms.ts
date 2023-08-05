import { Chatroom } from '../models/ChatroomSchema';
import { Request, Response, NextFunction } from 'express';


/* GET */

const createChatroom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    const chatroom = new Chatroom({ name });
    await chatroom.save();
    res.status(201).send(chatroom);
  } catch (err) {
    next(err);
  }
}

/* POST */

const findChatrooms = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const chatrooms = await Chatroom.find({});
    res.status(200).send(chatrooms);
  } catch (err) {
    next(err);
  }
}


export { createChatroom, findChatrooms };
