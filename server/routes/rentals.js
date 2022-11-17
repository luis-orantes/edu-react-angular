const express = require('express');
const router = express.Router();

const {
  getRentals,
  getRentalById,
  createRental,
  deleteRental,
  updateRental,
} = require('../controllers/rentals');


router.get('', getRentals);
router.get('/:rentalId', getRentalById);
router.post('', createRental);
router.delete('/:rentalId', deleteRental);
router.patch('/:rentalId', updateRental)

module.exports = router;
