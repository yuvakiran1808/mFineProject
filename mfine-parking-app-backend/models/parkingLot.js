const mongoose = require("mongoose");

const parkingLotSchema = new mongoose.Schema({
  id: {
    type: String,
    max:24
  },
  capacity: {
    type: Number,
    max: 2000,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("ParkingLot", parkingLotSchema);
