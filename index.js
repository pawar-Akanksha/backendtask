const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");


const port = process.env.PORT;
const url = process.env.MONGO_URL; // Check that the variable name matches the one in your .env file

// console.log("URL from .env:", url); // Debugging statement to verify URL






mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log("Connected to database");
  })
  .catch(err => {
    console.log("Error connecting database", err);
  })


app.use(express.json());
app.use(bodyParser());
  app.use(userRoutes);

app.get('/test', (req,res) => {
  res.json('express server test OK');
})

app.listen(port, () => {
  console.log(`Server is Running on ${port}`);
})
