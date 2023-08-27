require("express-async-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config/config");
require("dotenv").config();
const connectDB = require("./config/dbConn");

const app = express();
const PORT = config.port;

// connectDB();

app.use(cors(config.corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  console.log("working properly");
  res.send("hello there");
});

// app.use("/users", require("./routes/userRoute.js"));

// //protected with middleware verifyJWT for owner side
// app.use("/todos", require("./routes/todoRoute"));

// //for authentication
// app.use("/auth", require("./routes/authRoute"));

// mongoose.connection.once("open", () => {
//   console.log("connected to DB");
//   app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`));
// });

// mongoose.connection.on("error", (err) => {
//   console.log(err);
// });

app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`));
