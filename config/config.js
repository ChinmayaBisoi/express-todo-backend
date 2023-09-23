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
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

module.exports = config;
