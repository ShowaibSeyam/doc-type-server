require("dotenv").config();
const { betterAuth } = require("better-auth");
const { mongodbAdapter } = require("better-auth/adapters/mongodb");
const { MongoClient } = require("mongodb");

// Cache the connection promise globally so serverless warm instances reuse it.
// A new MongoClient without .connect() will fail — the adapter needs a live connection.
let clientPromise;

if (!global._mongoClientPromise) {
  const client = new MongoClient(process.env.MONGO_URI);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

// betterAuth is initialized synchronously but mongodbAdapter needs the connected client.
// We pass the promise and better-auth resolves it internally when needed.
const auth = betterAuth({
  database: mongodbAdapter(clientPromise),
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

module.exports = auth;