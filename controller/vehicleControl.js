let jwt = require("jsonwebtoken");
var config = require("../config/dbconfig");
const Vehicle = require("../models/vehicleModel");

var functions = {
  //AddNew
  addNew: async function (req, res, next) {
    const {
      vehicleImage,
      vehicleType,
      description,
      model,
      capacity,
      millage,
      user,
      price,
    } = req.body;

    console.log(
      vehicleImage,
      vehicleType,
      description,
      model,
      capacity,
      millage,
      user,
      price
    );
    try {
      //Check The mail in the dB
      var newVehicle = Vehicle({
        vehicleImage: vehicleImage,
        vehicleType: vehicleType,
        description: description,
        model: model,
        capacity: capacity,
        millage: millage,
        user: user,
        price: price,
      });
      newVehicle.save(function (err, newUser) {
        if (err) {
          // console.log(3);
          return res.json({
            success: false,
            msg: err.message,
          });
        } else {
          // console.log(4);
          return res.json({
            success: true,
            msg: "Successfully saved",
          });
        }
      });
    } catch {
      return res.json({
        success: false,
        msg: "Enter the correct Details",
      });
    }
  },
  //Get the all users
  handleGet: async function (req, res, next) {
    try {
      let allVehicle = await vehicle.find().select("-password");
      console.log(allVehicle);
      return res.status(200).json({ allVehicle: allVehicle });
    } catch (err) {
      if (err) {
        return next(err);
      }
    }
  },
};

module.exports = functions;
