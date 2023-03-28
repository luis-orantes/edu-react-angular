
const bookings = require("../models/bookings");

exports.createBooking = (req, res) => {
  return res.json({msg: 'Bookings working!'});
}
