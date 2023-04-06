
const moment = require('moment');
const { async } = require('rxjs/internal/scheduler/async');

const Bookings = require("../models/bookings");

exports.createBooking = async(req, res) => {
  const bookingData = req.body;
  const booking = new Bookings({...bookingData, user: res.locals.user});

  if(!bookingValidDate(booking))
    return res.apiErr('Invalid bookings', 'Invalid dates!');

  try {
    const rentalBookings = await Bookings.find({rental: bookingData.rental});
    const isValid = bookingValid(booking, rentalBookings);
    if(isValid) {
      const bookingSaved = await booking.save();
      return res.json({startAt: bookingSaved.startAt, endAt: bookingSaved.endAt});
    } else {
      return res.apiErr('Invalid bookings', 'Date already taken!');
    }
  } catch(error) {
    return res.dbErr(error);
  }
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
