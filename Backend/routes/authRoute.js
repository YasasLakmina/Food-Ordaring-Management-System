const express = require("express");
const {
  registerRestaurant,
  loginRestaurant,
} = require("../controllers/resturentController");
const router = express.Router();

router.post("/resturentRegister", registerRestaurant);
router.post("/resturentLogin", loginRestaurant);

module.exports = router;
