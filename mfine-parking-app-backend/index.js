/*
 * Created on 07 March 2024
 * @author Yuva Sai Kiran
 */

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const port = 3000;
const mongooose = require("mongoose");

const { CreateParkingLot } = require("./controllers/parkingLot");
const { parkCar, leaveCar } = require("./controllers/parking");

// mongodb connection
mongooose
  .connect("mongodb://127.0.0.1:27017/mfineapp")
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.log(error);
  });

// middle wares
app.use(bodyParser.json());
app.use(cookieParser());

/// Routes
app.post("/api/ParkingLots", CreateParkingLot);
app.post("/api/Parkings", parkCar);
app.delete("/api/Parkings", leaveCar);

app.get("/", (req, res) => {
  res.send("Hello there! I am up and running!");
});

// start server
app.listen(port, () => {
  console.log("testapp is up and running");
});
