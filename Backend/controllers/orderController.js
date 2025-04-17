const Order = require("../models/orderModel");

// Controller to get all orders for a restaurant
const getOrdersByRestaurant = async (req, res) => {
  try {
    const restaurantId = req.restaurant.id; // Get the logged-in restaurant's ID from the token

    // Fetch all orders for the restaurant
    const orders = await Order.find({ restaurantId }).populate(
      "items.menuItemId",
      "name price"
    );

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res
      .status(500)
      .json({
        message: "An error occurred while fetching orders",
        error: error.message,
      });
  }
};

// Controller to update the status of an order
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // Validate the status
    const validStatuses = [
      "pending",
      "preparing",
      "ready",
      "completed",
      "cancelled",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // Find and update the order
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res
      .status(200)
      .json({
        message: "Order status updated successfully",
        order: updatedOrder,
      });
  } catch (error) {
    console.error("Error updating order status:", error);
    res
      .status(500)
      .json({
        message: "An error occurred while updating the order status",
        error: error.message,
      });
  }
};

module.exports = {
  getOrdersByRestaurant,
  updateOrderStatus,
};
