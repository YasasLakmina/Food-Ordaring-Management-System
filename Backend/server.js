require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/dbConnection");
const authRoute = require("./routes/authRoute");
const menuItemRoute = require("./routes/menuItemRoute"); // Import menu item routes
const restaurantRoute = require("./routes/restaurantRoute"); // Import the restaurant route
const orderRoute = require("./routes/orderRoute"); // Import the order route

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use("/api/auth", authRoute);
app.use("/api/menuItems", menuItemRoute); // Add menu item routes
app.use("/api/restaurants", restaurantRoute); // Add the restaurant route
app.use("/api/orders", orderRoute); // Add the order route

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
