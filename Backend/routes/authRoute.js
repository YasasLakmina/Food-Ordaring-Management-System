const express = require("express");
const { registerRestaurant } = require("../controllers/resturentController");
const router = express.Router();

router.post("/resturentRegister", registerRestaurant);

module.exports = router;
