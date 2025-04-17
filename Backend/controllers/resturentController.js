const Restaurant = require("../models/restaurantModel"); // Import the Restaurant model
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

// Controller for restaurant login
const loginRestaurant = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the restaurant exists
    const restaurant = await Restaurant.findOne({ username });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, restaurant.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: restaurant._id, username: restaurant.username },
      process.env.JWT_SECRET || "your_jwt_secret", // Use a secure secret in production
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    res.status(200).json({
      message: "Login successful",
      token,
      restaurant: {
        id: restaurant._id,
        username: restaurant.username,
        restaurantName: restaurant.restaurantName,
        email: restaurant.email,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      message: "An error occurred during login",
      error: error.message,
    });
  }
};

module.exports = {
  loginRestaurant,
  registerRestaurant, // Ensure this is still exported
};
