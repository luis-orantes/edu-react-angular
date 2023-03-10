const express = require('express');
const router = express.Router();

const { userAuth } = require('../controllers/users');

const {
  getRentals,
  getRentalById,
  createRental,
} = require('../controllers/rentals');


router.get('', getRentals);
router.get('/:rentalId', getRentalById);
router.post('', userAuth, createRental);

module.exports = router;
