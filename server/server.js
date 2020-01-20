const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const passport = require("passport");

//routes

// instantiating express
const app = express();

// Instantiating passport
app.use(passport.initialize());

require("./auth/passport-config")(passport);
//imports our configuration file which holds our verification callbacks and things like the secret for signing.

// debuging tools
const morgan = require("morgan");

// configuring morgan
app.use(morgan("tiny"));

// instantiating dotenv
require("dotenv").config();

//configuring bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// sets the path to store the uploaded images
app.use(express.static("uploads"));

// creating a simple route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// mounting of routing middleware
app.use(fileUpload());

app.use("/api", require("./routes/index"));

// registering our routes

// creating the server and connecting to the database

const port = 4000;

const db = process.env.MONGO_URI_KEY;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log("Listening on port " + port);
    });
  })
  .catch(error => {
    console.log({
      message: `Unable to establish a connection to the server ${error}`
    });
  });
