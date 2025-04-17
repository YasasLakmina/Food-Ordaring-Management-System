const Restaurant = require("../models/restaurantModel"); // Import the Restaurant model
const bcrypt = require("bcrypt");

// Controller for restaurant registration
const registerRestaurant = async (req, res) => {
  try {
    const {
      username,
      password,
      restaurantName,
      contactNumber,
      email,
      location,
      deliveryRange,
      openTime,
      closeTime,
    } = req.body;

    // Check if the username or email already exists
    const existingRestaurant = await Restaurant.findOne({
      $or: [{ username }, { email }],
    });
    if (existingRestaurant) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new restaurant
    const newRestaurant = new Restaurant({
      username,
      password: hashedPassword,
      restaurantName,
      contactNumber,
      email,
      location,
      deliveryRange,
      openTime,
      closeTime,
    });

    console.log(username); // Log the restaurant data

    // Save the restaurant to the database
    await newRestaurant.save();

    res.status(201).json({
      message: "Restaurant registered successfully",
      restaurant: newRestaurant,
    });
  } catch (error) {
    console.error("Error during registration:", error); // Log the error
    res.status(500).json({
      message: "An error occurred during registration",
      error: error.message,
    });
  }
};

module.exports = {
  registerRestaurant,
};
