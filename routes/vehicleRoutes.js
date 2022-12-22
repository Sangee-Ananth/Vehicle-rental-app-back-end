const express = require("express");
const router = express.Router();
const vehicleControl = require("../controller/vehicleControl");

//Get the All user Info     => All vehicle
router.get("/search/vehicle/:type/:district", vehicleControl.handleGet);

router.post("/vehicle/addnew", vehicleControl.addNew, () => {
  console.log("testing");
});
module.exports = router;