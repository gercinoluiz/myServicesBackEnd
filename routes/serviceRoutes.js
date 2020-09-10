const express = require("express");
const serviceController = require("../controllers/serviceController");

const router = express.Router();

// router.get("/servico/:serviceId")

router.post("/newservice", serviceController.createService);

module.exports = router;
