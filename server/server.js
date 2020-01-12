const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

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
app.use("/api", require("./routes/index"));

// registering our routes

// creating the server and connecting to the database
mongoose
  .connect(
    "mongodb+srv://cyrus254:@Ashphalt254@cluster0-lu0o4.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
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
