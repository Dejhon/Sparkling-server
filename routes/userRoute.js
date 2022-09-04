const express = require('express');
const router = express.Router();
const userController = require('./../controllers/users');
const { getUsers,
        addUser,
      } = require('./../controllers/users');


router
    .route('/')
    .post(addUser)
    .get(getUsers)

router
    .route('/:id')
    .get(userController.getUserById)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;