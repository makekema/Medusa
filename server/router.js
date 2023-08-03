const router = require('express').Router();

const { createChatroom, findChatrooms } =
require('./controllers/chatrooms.js');


router.post('/chatrooms', createChatroom);

router.get('/chatrooms', findChatrooms);


module.exports = router;