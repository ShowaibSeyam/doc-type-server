const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  image: String,
  experience: String,
  availability: [String],
  description: String,
  hospital: String,
  location: String,
  fee: Number,
  rating: { type: Number, default: 0 }   // "Top Rated Doctors" section er jonno lagbe
});

module.exports = mongoose.model('Doctor', doctorSchema);