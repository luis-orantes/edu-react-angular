const Rental = require('../models/rental');


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

  Rental.findById(rentalId, (error, foundRental) => {
    if(error) {
      return res.status(422).send({errors: [{title: 'Rental Error!', message: 'Cannot retrieve rental data!'}]});
    }
    return res.json(foundRental);
  })
}

exports.createRental = (req, res) => {
  const rentalData = req.body;

  Rental.create(rentalData, (error, createdRental) => {
    if (error) {
      return new Rental().sendError(res, {status: 422, detail: 'Cannot post rental data!'});
    }
    res.json({
      message: `rental with id ${createdRental._id} was added!` 
    });  
  })
}
