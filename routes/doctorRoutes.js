const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// GET all doctors
router.get('/', async (req, res) => {
  const doctors = await Doctor.find();
  res.send(doctors);
});

// GET single doctor
router.get('/:id', async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  res.send(doctor);
});

module.exports = router;