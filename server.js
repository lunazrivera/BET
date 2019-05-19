//Requiring dependencies for our server functionality
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");

const users = require("./routes/api/user"); //Requiring the path for the request to be made got to user routes
const budgets = require("./routes/api/budget");
const expenses = require("./routes/api/expense");

const PORT = process.env.PORT || 3002;
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//Database configuration
const db = process.env.MONGODB_URI || "mongodb://localhost/bet";

// Connect to MongoDB
mongoose.connect(db, {useNewUrlParser: true }).then(() => console.log("MongoDB succesfully connected")).catch(err => console.log(err));


//Passport middleware
app.use(passport.initialize())

//Passport config
require("./config/passport")(passport);

// Define API routes here
app.use("/api/users", users);
app.use("/api/budgets", budgets);
app.use("/api/expenses", expenses);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
