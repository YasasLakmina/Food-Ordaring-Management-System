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

// Add this before your routes
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Database connection
connectDB();

// Debug registered routes
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()}: ${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/restaurant", require("./routes/restaurantRoute"));
app.use("/api/order", require("./routes/orderRoute"));
app.use("/api/menu", require("./routes/menuItemRoute"));
app.use("/api/images", require("./routes/imageRoutes")); // Add this line with your other routes
app.use("/uploads", express.static("uploads")); // Add this line to serve static files from the uploads directory

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
