

const rentals = [
  {
    _id: '2137129312',
    city: 'New York',
    title: 'Very nice place'
  },
  {
    _id: 'asjkdajdasnda',
    city: 'Berlin',
    title: 'Very nice place as well!'
  },
  ]

function rentalsFind(rentalId) {
  return rentals.findIndex(item => item._id === rentalId);
}

exports.getRentals = (req, res) => {
  return res.json(rentals);
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

exports.deleteRental = (req, res) => {
  const { rentalId } = req.params;
  const id = rentalsFind(rentalId);
  if(id >= 0) {
    rentals.splice(id, 1);
    res.json({
      message: `rental with id ${rentalId} was deleted!` 
    });
  } else {
    res.json({
      message: `ERROR: rental with id ${rentalId} was not found!` 
    });
  }
}

exports.updateRental = (req, res) => {
  const { rentalId } = req.params;
  const id = rentalsFind(rentalId);
  const rentalData = req.body;
  if(id >= 0) {
    rentals[id].city = rentalData.city;
    rentals[id].title = rentalData.title;
    res.json({
      message: `rental with id ${rentalId} was updated!` 
    });
  } else {
    res.json({
      message: `ERROR: rental with id ${rentalId} was not found!` 
    });
  }
}
