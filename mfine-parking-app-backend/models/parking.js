/*
 * Created on 07 March 2024
 * @author Yuva Sai Kiran
 */
const mongoose = require("mongoose");

const parkingSchema = new mongoose.Schema({
  parkingLotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ParkingLot',
    required: true,
  },
  registrationNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Validate the registration number format
        // Assuming MH12A1234 format where MH is the state code, 12 is district code, and A1234 is the number
        const regex = /^[A-Z]{2}\d{2}[A-Z]\d{4}$/;
        return regex.test(value);
      },
      message: "Invalid registration number format",
    },
  },
  color: {
    type: String,
    enum: ["RED", "GREEN", "BLUE", "BLACK", "WHITE", "YELLOW", "ORANGE"],
    required: true,
  },
  status: {
    type: String,
    enum: ["PARKED", "LEFT"],
    required: true,
  },
  slotNumber: {
    type: Number,
    required: true,
  },
});


module.exports = mongoose.model("Parking", parkingSchema);
