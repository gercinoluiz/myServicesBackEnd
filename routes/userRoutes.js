const router = require("express").Router();
const userController = require("../controllers/userController");

// Creating a new user
router.post("/createUser", userController.createUser);

module.exports = router;
