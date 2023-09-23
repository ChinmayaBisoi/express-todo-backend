require("dotenv").config();
const corsOptions = require("./corsOptions");

// Define your allowed origins
const allowedOrigins = [
  "https://cbi-todo-app.vercel.app",
  // Add other allowed origins as needed
];

const config = {
  port: process.env.PORT || 8080,
  corsOptions: corsOptions,
  databaseUri: process.env.DATABASE_URI || "",
  credentials: true,
  origin: function (origin, callback) {
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg =
        "The CORS policy for this site does not " +
        "allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
};

module.exports = config;
