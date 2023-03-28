
const moongose = require('mongoose');
const Schema = moongose.Schema;

const bookingSchema = new Schema({
  starAt: {type: Date, required: 'start date is required'},
  endAt: {type: Date, required: 'end date is required'},
  price: {type: Number, required: true},
  nights: {type: Number, required: true},
  guests: {type: Number, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  rental: {type: Schema.Types.ObjectId, ref: 'Rentals', required: true},
  createdAt: {type: Date, default: Date.now},
});

module.exports = moongose.model('Booking', bookingSchema);
