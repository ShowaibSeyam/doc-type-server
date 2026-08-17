const { betterAuth } = require("better-auth");
const { mongodbAdapter } = require("better-auth/adapters/mongodb");

const auth = betterAuth({
  database: mongodbAdapter(client), // MongoClient instance dorkar hobe, mongoose theke alada
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }
    // GitHub use korle eta bad diye githubProvider config koro
  },
  secret: process.env.JWT_SECRET,
});

module.exports = auth;