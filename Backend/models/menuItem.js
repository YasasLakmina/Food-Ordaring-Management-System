const mongoose = require("mongoose");

// Define the schema for the menu item
const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0, // or null
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId, // Fixed mongoose1 to mongoose
      ref: "Restaurant", // Reference to the Restaurant model
      required: true,
    },
  },
  { timestamps: true }
);

// Create the model
const MenuItem = mongoose.model("MenuItem", menuItemSchema);

module.exports = MenuItem; // Export the model using CommonJS
