const express = require("express");
const locationController = require("../controllers/locationController");

const router = express.Router();

// router.get("/servico/:serviceId")

router.post("/newlocation", locationController.createLocation);

router.get("/getlocations", locationController.getLocations);

// router.get(
//   "/getlocationswithin/distance/:distance/center/:latlng/unit/:unit",
//   locationController.getLocationsWithin
// );

router.get("/getlocationsnear/:latlng", locationController.getLocationsNear)

router.get("/getlocationsbyservice/:latlng/:serviceId", locationController.getNearLocationByServices)

router.delete("/deleteLocation/:LocalId", locationController.deletLocation)

router.patch("/updateLocation/:localId", locationController.updateLocation)


module.exports = router;
