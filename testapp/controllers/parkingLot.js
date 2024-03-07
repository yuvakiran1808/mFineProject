const ParkingLot = require("../models/parkingLot");

exports.CreateParkingLot = (req, res) => {
  const parklot = new ParkingLot(req.body);

  parklot
    .save()
    .then((parklot) => {
      if (parklot.id >= 0 && parklot.id.length < 24) {
        return res.status(400).json({
          isSuccess: false,
          error: {
            reason: "Invalid ID",
          },
        });
      }
      return res.json({
        isSuccess: true,
        response: {
          id: parklot.id,
          capacity: parklot.capacity,
          isActive: true,
        },
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: "unable to create a parking lot",
      });
    });
};
