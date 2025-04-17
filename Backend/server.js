require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/dbConnection");
const authRoute = require("./routes/authRoute");
const menuItemRoute = require("./routes/menuItemRoute"); // Import menu item routes

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use("/api/auth", authRoute);
app.use("/api/menuItems", menuItemRoute); // Add menu item routes

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
