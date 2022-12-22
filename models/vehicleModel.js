var mongoose = require("mongoose");
var schema = mongoose.Schema;

let vehicleSchema = new schema({
  vehicleImage: {
    type: String,
    require: false,
  },
  description: {
    type: String,
    require: true,
  },
  model: {
    type: String,
    require: true,
  },
  capacity: {
    type: String,
    require: true,
  },
  millage: {
    type: String,
    require: true,
  },
  vehicleType: {
    type: String,
    require: true,
  },
  user: {
    type: String,
    require: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
    default: 0,
  },
});
module.exports = mongoose.model("vehicle", vehicleSchema);