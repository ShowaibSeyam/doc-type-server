require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

// Track any startup errors so we can expose them instead of crashing silently
let initError = null;
let authHandler = null;

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(cookieParser());

// Health check — also reports any startup error so we can diagnose
app.get('/', (req, res) => {
  if (initError) {
    return res.status(500).json({
      status: 'startup_error',
      message: initError.message,
      stack: initError.stack,
      mongoUri: process.env.MONGO_URI ? 'SET' : 'MISSING',
      betterAuthSecret: process.env.BETTER_AUTH_SECRET ? 'SET' : 'MISSING',
    });
  }
  res.json({ status: 'DocAppoint server running' });
});

// Auth routes — served lazily after mongoose connects
app.all('/api/auth/*', (req, res, next) => {
  if (!authHandler) {
    return res.status(503).json({
      error: 'Auth not ready',
      reason: initError ? initError.message : 'Still initialising',
    });
  }
  return authHandler(req, res, next);
});

// API routes
app.use('/doctors', express.json(), require('./routes/doctorRoutes'));
app.use('/appointments', express.json(), require('./routes/appointmentRoutes'));

// Bootstrap: connect mongoose, then init better-auth using the live connection
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    const { toNodeHandler } = require('better-auth/node');
    const getAuth = require('./lib/auth');
    const auth = getAuth();
    authHandler = toNodeHandler(auth);
    console.log('better-auth initialised');
  } catch (err) {
    initError = err;
    console.error('Bootstrap error:', err);
  }
})();

// Only start a persistent server in local development.
// On Vercel (serverless) the app is exported and invoked as a function.
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;