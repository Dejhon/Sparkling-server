const express = require('express');
const router = express.Router();
const messageController = require('./../controllers/message');
const cors = require('cors')
const { getAllMessages,
        addMessage, 
        getMessageById, 
        updateMessage, 
        deleteMessage } = require('../controllers/message');


      var whitelist = ['http://localhost:4200','http://localhost:3000/sparkling/bookings']
      var corsOptions = {
        origin: function (origin, callback) {
          if (whitelist.includes(origin) !== -1) {
            callback(null, true)
          } else {
            callback(new Error('Not allowed by CORS'))
          }
        }
      }
      
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