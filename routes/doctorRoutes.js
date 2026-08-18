const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// GET top rated doctors — MUST be before /:id to avoid being caught by wildcard
router.get('/top-rated', async (req, res) => {
  const doctors = await Doctor.find().sort({ rating: -1 }).limit(3);
  res.send(doctors);
});

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