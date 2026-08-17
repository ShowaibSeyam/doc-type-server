const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userEmail: String,
  doctorId: String,       // kon doctor-er sathe booking, reference rakhar jonno
  doctorName: String,
  patientName: String,
  gender: String,
  phone: String,
  appointmentDate: String,
  appointmentTime: String
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);