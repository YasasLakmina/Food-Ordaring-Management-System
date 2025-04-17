const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/dbConnection.js");
const authRoute = require("./routes/authRoute.js");

//app config
const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json());

//db Connection
connectDB();

// Routes
app.use("/api/auth", authRoute); // Use the auth route

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
