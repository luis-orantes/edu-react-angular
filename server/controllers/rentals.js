const Rental = require('../models/rental');


function rentalsFind(rentalId) {
  return rentals.findIndex(item => item._id === rentalId);
}

exports.getRentals = (req, res) => {
  Rental.find({}, (error, foundRentals) => {
    if(error) {
      return res.status(422).send({errors: [{title: 'Rental Error!', message: 'Cannot retrieve rental data!'}]});
    }
    return res.json(foundRentals);
  })
}

exports.getRentalById = (req, res) => {
  const { rentalId } = req.params;
  const rental = rentals.find(item => item._id === req.params.rentalId);
  return res.json(rental);
}

exports.createRental = (req, res) => {
  const rentalData = req.body;
  rentals.push(rentalData);
  res.json({
    message: `rental with id ${rentalData._id} was added!` 
  });
}
