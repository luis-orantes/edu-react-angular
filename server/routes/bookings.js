
const express = require('express');
const router = express.Router();

const { createBooking } = require('../controllers/bookings');
const { userAuth } = require('../controllers/users');

router.post('', userAuth, createBooking);

module.exports = router;
