const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const {toNodeHandler} = require('better-auth/node');
const auth = require('./lib/auth');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

app.all('/auth/*', toNodeHandler(auth));

//changable 
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,   // cookie pathanor jonno must
}));

app.get('/', (req, res) => res.send('DocAppoint server running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use('/doctors', require('./routes/doctorRoutes'));
app.use('/appointments', require('./routes/appointmentRoutes'));