/*
 * Created on 07 March 2024
 * @author Yuva Sai Kiran
 */
const Parking = require("../models/parking");
const ParkingLot = require("../models/parkingLot");

//controller for handling the car parking

exports.parkCar = async (req, res) => {
  try {
    // Validate payload
    const { parkingLotId, registrationNumber, color, slotNumber } = req.body;

    // Check if the parkingLotId corresponds to an active parkingLot
    const isValidParkingLot = await ParkingLot.findOne({
      _id: parkingLotId,
      isActive: true,
    });

    if (!isValidParkingLot) {
      return res
        .status(400)
        .json({ isSuccess: false, error: "Invalid parkingLotId" });
    }

    // Validate the registration number format
    const isValidRegistrationNumber = /^[A-Z]{2}\d{2}[A-Z]\d{4}$/.test(
      registrationNumber
    );
    if (!isValidRegistrationNumber) {
      return res
        .status(400)
        .json({
          isSuccess: false,
          error: "Invalid registration number format",
        });
    }

    // Check if the color is valid
    const validColors = [
      "RED",
      "GREEN",
      "BLUE",
      "BLACK",
      "WHITE",
      "YELLOW",
      "ORANGE",
    ];
    if (!validColors.includes(color)) {
      return res
        .status(400)
        .json({ isSuccess: false, error: "Invalid car color" });
    }

    // Perform the parking action and save to the database
    const parkedCar = new Parking({
      parkingLotId,
      registrationNumber,
      color,
      status: "PARKED",
      slotNumber,
    });

    await parkedCar.save();

    res
      .status(200)
      .json({ isSuccess: true, response: { slotNumber, status: "PARKED" } });
  } catch (error) {
    console.error("Error parking the car:", error);
    res.status(500).json({ isSuccess: false, error: "Internal Server Error" });
  }
};

exports.leaveCar = async (req, res) => {
  try {
    // Validate payload
    const { parkingLotId, registrationNumber } = req.body;

    // Check if the parkingLotId corresponds to an active parkingLot
    const isValidParkingLot = await ParkingLot.findOne({
      _id: parkingLotId,
      isActive: true,
    });

    if (!isValidParkingLot) {
      return res
        .status(400)
        .json({ isSuccess: false, error: "Invalid parkingLotId" });
    }

    // Find the parked car by registration number
    const parkedCar = await Parking.findOne({
      parkingLotId,
      registrationNumber,
      status: "PARKED",
    });

    if (!parkedCar) {
      return res
        .status(404)
        .json({ isSuccess: false, error: "Car not found or already left" });
    }

    // Perform the leaving action and update the database
    parkedCar.status = "LEFT";
    await parkedCar.save();

    res.status(200).json({
      isSuccess: true,
      response: {
        slotNumber: parkedCar.slotNumber,
        registrationNumber: parkedCar.registrationNumber,
        status: "LEFT",
      },
    });
  } catch (error) {
    console.error("Error leaving the car:", error);
    res.status(500).json({ isSuccess: false, error: "Internal Server Error" });
  }
};
