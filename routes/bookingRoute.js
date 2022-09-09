const express = require('express');
const router = express.Router();
const bookingController = require('./../controllers/bookings');
const { getBookings, addReservation } = require('../controllers/bookings');

      
router
    .route('/')
    .get(getBookings)
    .post(addReservation)

router
    .route('/:id')
    .get(bookingController.getReservationById)
    .patch(bookingController.updateReservation)
    .delete(bookingController.cancelReservation);

module.exports = router;