require('dotenv').config();
const mongoose = require('mongoose');
const Doctor = require('./models/Doctor');

const doctors = [
  {
    name: "Dr. Ayesha Rahman",
    specialty: "Cardiologist",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop",
    experience: "10 years",
    availability: ["09:00 AM - 12:00 PM", "04:00 PM - 07:00 PM"],
    description: "Highly experienced cardiologist specializing in heart diseases and preventive cardiology. Member of the Bangladesh Cardiac Society.",
    hospital: "Labaid Cardiac Hospital",
    location: "Dhanmondi, Dhaka",
    fee: 800,
    rating: 4.9
  },
  {
    name: "Dr. Rafiul Hasan",
    specialty: "Neurologist",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop",
    experience: "14 years",
    availability: ["10:00 AM - 01:00 PM", "05:00 PM - 08:00 PM"],
    description: "Expert neurologist with extensive experience in treating stroke, epilepsy, and migraine disorders.",
    hospital: "National Institute of Neurosciences",
    location: "Agargaon, Dhaka",
    fee: 1000,
    rating: 4.8
  },
  {
    name: "Dr. Farzana Akter",
    specialty: "Gynecologist",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=300&fit=crop",
    experience: "8 years",
    availability: ["09:00 AM - 01:00 PM", "03:00 PM - 06:00 PM"],
    description: "Compassionate gynecologist dedicated to women's health, prenatal care, and reproductive medicine.",
    hospital: "Square Hospital",
    location: "Panthapath, Dhaka",
    fee: 700,
    rating: 4.7
  },
  {
    name: "Dr. Mizanur Rahman",
    specialty: "Orthopedic Surgeon",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=300&fit=crop",
    experience: "12 years",
    availability: ["08:00 AM - 11:00 AM", "03:00 PM - 06:00 PM"],
    description: "Specialized in joint replacement surgery, sports injuries, and spinal disorders with over 500 successful surgeries.",
    hospital: "Bangladesh Specialized Hospital",
    location: "Mohammadpur, Dhaka",
    fee: 900,
    rating: 4.8
  },
  {
    name: "Dr. Sumaia Begum",
    specialty: "Dermatologist",
    image: "https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=400&h=300&fit=crop",
    experience: "6 years",
    availability: ["11:00 AM - 02:00 PM", "05:00 PM - 08:00 PM"],
    description: "Expert in skin conditions, cosmetic dermatology, and hair loss treatment. Certified by the Bangladesh Dermatological Society.",
    hospital: "Popular Medical Centre",
    location: "Shantinagar, Dhaka",
    fee: 600,
    rating: 4.6
  },
  {
    name: "Dr. Tariqul Islam",
    specialty: "Pediatrician",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=300&fit=crop",
    experience: "9 years",
    availability: ["09:30 AM - 12:30 PM", "04:30 PM - 07:30 PM"],
    description: "Dedicated pediatrician providing comprehensive care for newborns, infants, and children up to age 18.",
    hospital: "Dhaka Shishu Hospital",
    location: "Sher-e-Bangla Nagar, Dhaka",
    fee: 550,
    rating: 4.9
  },
  {
    name: "Dr. Nahid Hassan",
    specialty: "Diabetologist",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
    experience: "11 years",
    availability: ["10:00 AM - 01:00 PM", "04:00 PM - 07:00 PM"],
    description: "Specialist in diabetes management, endocrine disorders, and metabolic diseases. Member of BADAS.",
    hospital: "BIRDEM General Hospital",
    location: "Shahbag, Dhaka",
    fee: 750,
    rating: 4.7
  },
  {
    name: "Dr. Sabrina Chowdhury",
    specialty: "Ophthalmologist",
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=300&fit=crop",
    experience: "7 years",
    availability: ["08:30 AM - 11:30 AM", "02:00 PM - 05:00 PM"],
    description: "Eye specialist with expertise in cataract surgery, glaucoma treatment, and LASIK correction procedures.",
    hospital: "Eye Hospital & Institute",
    location: "Banani, Dhaka",
    fee: 650,
    rating: 4.6
  }
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Doctor.deleteMany({});
  await Doctor.insertMany(doctors);
  console.log(`Seeded ${doctors.length} doctors!`);
  process.exit();
});