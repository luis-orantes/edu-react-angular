
const express = require('express');
const router = express.Router();

const { createBooking } = require('../controllers/bookings');
const { isUserRentalOwner } = require('../controllers/rentals');
const { userAuth } = require('../controllers/users');

router.post('', userAuth, isUserRentalOwner, createBooking);

module.exports = router;
