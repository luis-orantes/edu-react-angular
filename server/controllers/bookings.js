
const Bookings = require("../models/bookings");

exports.createBooking = (req, res) => {
  const bookingData = req.body;
  const bookings = new Bookings({...bookingData, user: res.locals.user});

  Bookings.find({rental: bookingData.rental}, (error, rentalBookings) => {
    if(error)
      return res.dbErr(error);

    const isValid = bookingValid(bookings, rentalBookings);
    if(isValid) {
      bookings.save((error, bookingSaved) => {
        if(error)
          return res.dbErr(error);
  
        return res.json({startAt: bookingSaved.starAt, endAt: bookingSaved.endAt});
      });
    } else {
      return res.apiErr('Bookings', 'Invalid booking, not created!')
    }
  })
}

function bookingValid(booking, rentalBooking) {
  return true;
}
