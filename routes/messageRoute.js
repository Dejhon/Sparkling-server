const express = require('express');
const router = express.Router();
const messageController = require('./../controllers/message');
const { getAllMessages,
        addMessage, 
        getMessageById, 
        updateMessage, 
        deleteMessage } = require('../controllers/message');

router
    .route('/')
    .get(getAllMessages)
    .post(addMessage)

router
    .route('/:id')
    .get(getMessageById)
    .patch(updateMessage)
    .delete(deleteMessage);

module.exports = router;