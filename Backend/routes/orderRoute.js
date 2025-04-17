const express = require("express");
const { getOrdersByRestaurant, updateOrderStatus } = require("../controllers/orderController");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

// Route to get all orders for a restaurant
router.get("/", authenticate, getOrdersByRestaurant);

// Route to update the status of an order
router.put("/:orderId/status", authenticate, updateOrderStatus);

module.exports = router;