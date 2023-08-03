const Chatroom = require('../models/Chatroom');


async function createChatroom (req, res, next) {
  try {
    const { name } = req.body;
    const chatroom = new Chatroom({ name });
    await chatroom.save();
    res.status(201).json(chatroom);
  } catch (err) {
    next(err);
  }
}

async function findChatrooms (req, res, next) {
  try {
    const chatrooms = await Chatroom.find({});
    res.status(200).json(chatrooms);
  } catch (err) {
    next(err);
  }
}


module.exports = { createChatroom, findChatrooms };
