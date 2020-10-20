const express = require("express");
const serviceController = require("../controllers/serviceController");

const router = express.Router();

// router.get("/servico/:serviceId")

router.post("/newservice", serviceController.createService);

router.get("/getAllServices", serviceController.getAllServices);

router.patch("/updateService/:serviceId", serviceController.updateService);


router.delete("/deleteService/:serviceId", serviceController.deleteService);


module.exports = router;
