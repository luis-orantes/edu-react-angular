
const moment = require('moment');

const Bookings = require("../models/bookings");

exports.createBooking = (req, res) => {
  const bookingData = req.body;
  const booking = new Bookings({...bookingData, user: res.locals.user});

  if(!bookingValidDate(booking))
    return res.apiErr('Invalid bookings', 'Invalid dates!');

  Bookings.find({rental: bookingData.rental}, (error, rentalBookings) => {
    if(error)
      return res.dbErr(error);

    const isValid = bookingValid(booking, rentalBookings);
    if(isValid) {
      booking.save((error, bookingSaved) => {
        if(error)
          return res.dbErr(error);
  
        return res.json({startAt: bookingSaved.startAt, endAt: bookingSaved.endAt});
      });
    } else {
      return res.apiErr('Invalid bookings', 'Date already taken!');
    }
  })
}

function bookingValid(booking, rentalBookings = []) {
  let result = true;
  
  if(rentalBookings) {
    const bookingStartAtMoment = moment(booking.startAt);
    const bookingEndAtMoment = moment(booking.endAt);
    // at fisrt occurrence of overlaping dates return true which it will
    // stop the loop.
    result = !rentalBookings.some(rentalBooking => { // invert, because if occurrent found, it is invalid
      const rentalStartAtMoment = moment(rentalBooking.startAt);
      const rentalEndAtMoment = moment(rentalBooking.endAt);

      return ((bookingStartAtMoment>=rentalStartAtMoment && bookingStartAtMoment<=rentalEndAtMoment)
        || (bookingEndAtMoment<=rentalEndAtMoment && bookingEndAtMoment>=rentalStartAtMoment))
    });
  }

  return result;
}

function bookingValidDate(booking) {
  let result = true;

  if(!booking.startAt || !booking.endAt)
    result = false;

  const bookingStartAtMoment = moment(booking.startAt);
  const bookingEndAtMoment = moment(booking.endAt);
  if(bookingStartAtMoment > bookingEndAtMoment)
    return false;
  
  return result;
}
