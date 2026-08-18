const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { toNodeHandler } = require('better-auth/node');
const getAuth = require('./lib/auth');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(cookieParser());
// Note: express.json() is NOT applied globally — better-auth needs the raw body
// for auth routes. It is applied only to non-auth routes below.

app.get('/', (req, res) => res.send('DocAppoint server running'));

// Wire up routes that need JSON parsing
app.use('/doctors', express.json(), require('./routes/doctorRoutes'));
app.use('/appointments', express.json(), require('./routes/appointmentRoutes'));

// Connect to MongoDB, then initialise better-auth with the live connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    // Initialise better-auth only after mongoose is connected so
    // mongoose.connection.getClient() returns a live native MongoClient.
    const auth = getAuth();
    app.all('/api/auth/*splat', toNodeHandler(auth));
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Only start a persistent server in local development.
// On Vercel (serverless), the app is imported and invoked as a function.
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;