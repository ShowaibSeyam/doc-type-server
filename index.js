require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(cookieParser());

// Diagnostic: show env var status and any DB error
let dbError = null;

app.get('/', (req, res) => {
  res.json({
    status: 'running',
    mongoUri: process.env.MONGO_URI ? 'SET' : 'MISSING',
    betterAuthSecret: process.env.BETTER_AUTH_SECRET ? 'SET' : 'MISSING',
    dbError: dbError ? dbError.message : null,
    dbState: mongoose.connection.readyState, // 0=disconnected,1=connected,2=connecting
  });
});

app.use('/doctors', express.json(), require('./routes/doctorRoutes'));
app.use('/appointments', express.json(), require('./routes/appointmentRoutes'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => { dbError = err; console.error('MongoDB error:', err.message); });

// NOTE: better-auth is temporarily removed to isolate the crash.
// It will be added back once this baseline is confirmed working.

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;