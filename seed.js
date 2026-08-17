require('dotenv').config();
const mongoose = require('mongoose');
const Doctor = require('./models/Doctor');

const doctors = [
  {
    name: "Dr. Ayesha Rahman",
    specialty: "Cardiologist",
    image: "https://i.ibb.co/doctor-demo.jpg",
    experience: "10 years",
    availability: ["09:00 AM - 12:00 PM", "04:00 PM - 07:00 PM"],
    description: "Highly experienced cardiologist specializing in heart diseases.",
    hospital: "Labaid Cardiac Hospital",
    location: "Dhanmondi, Dhaka",
    fee: 800,
    rating: 4.8
  }
  // aro doctor add koro, minimum 6-8ta rakhle valo dekhabe
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Doctor.deleteMany({});
  await Doctor.insertMany(doctors);
  console.log('Seeded!');
  process.exit();
});