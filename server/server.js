const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");

//routes

// instantiating dotenv
require("dotenv").config();

// instantiating express
const app = express();

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

const db = process.env.MONGO_URI_KEY;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(4000, () => {
      console.log("Listening on port 4000");
    });
  })
  .catch(error => {
    console.log({
      message: `Unable to establish a connection to the server ${error}`
    });
  });
