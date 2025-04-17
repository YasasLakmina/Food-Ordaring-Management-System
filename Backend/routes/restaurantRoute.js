const express = require("express");
const { updateOpenCloseStatus } = require("../controllers/resturentController");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

// Route to update open/close status (only accessible to logged-in restaurants)
router.put("/status", authenticate, updateOpenCloseStatus);

module.exports = router;
