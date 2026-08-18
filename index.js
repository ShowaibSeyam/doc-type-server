const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { toNodeHandler } = require('better-auth/node');
const auth = require('./lib/auth');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Better Auth handler — must come before express.json parses auth routes
app.all('/auth/*splat', toNodeHandler(auth));

app.get('/', (req, res) => res.send('DocAppoint server running'));

app.use('/doctors', require('./routes/doctorRoutes'));
app.use('/appointments', require('./routes/appointmentRoutes'));

// Only start a persistent server in local development.
// On Vercel (serverless), the app is imported and invoked as a function.
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;