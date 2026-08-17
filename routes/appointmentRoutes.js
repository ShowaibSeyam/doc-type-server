const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const verifyToken = require('../middleware/verifyToken');

// GET all (All Appointments page)
router.get('/', async (req, res) => {
  const appointments = await Appointment.find();
  res.send(appointments);
});

// GET by user email (My Bookings) - protected
router.get('/my-bookings', verifyToken, async (req, res) => {
  const email = req.query.email;
  if (req.user.email !== email) {
    return res.status(403).send({ message: 'forbidden access' });
  }
  const bookings = await Appointment.find({ userEmail: email });
  res.send(bookings);
});

// POST create booking - protected
router.post('/', verifyToken, async (req, res) => {
  const appointment = req.body;
  const result = await Appointment.create(appointment);
  res.send(result);
});

// PATCH update - protected
router.patch('/:id', verifyToken, async (req, res) => {
  const updatedData = req.body;
  const result = await Appointment.findByIdAndUpdate(
    req.params.id,
    { $set: updatedData },
    { new: true }
  );
  res.send(result);
});

// DELETE - protected
router.delete('/:id', verifyToken, async (req, res) => {
  const result = await Appointment.findByIdAndDelete(req.params.id);
  res.send(result);
});

module.exports = router;