
const bookings = require("../models/bookings");

exports.createBooking = (req, res) => {
  const bookingData = req.body;

  return res.json({msg: 'Bookings working!'});
}
