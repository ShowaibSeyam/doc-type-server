require("dotenv").config();
const { betterAuth } = require("better-auth");
const { mongodbAdapter } = require("better-auth/adapters/mongodb");
const mongoose = require("mongoose");

// Reuse the mongoose connection's underlying native MongoClient.
// This avoids opening a second connection to Atlas and ensures the client
// is already connected when better-auth needs it.
// mongoose.connect() is called in index.js before this is used.
function getAuth() {
  const nativeClient = mongoose.connection.getClient();
  const db = nativeClient.db();

  return betterAuth({
    database: mongodbAdapter(db, { client: nativeClient }),
    secret: process.env.BETTER_AUTH_SECRET || process.env.JWT_SECRET,
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:5000",
    trustedOrigins: [process.env.CLIENT_URL || "http://localhost:3000"],
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 6,
    },
    socialProviders: {
      ...(process.env.GOOGLE_CLIENT_ID && {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
      }),
    },
  });
}

module.exports = getAuth;