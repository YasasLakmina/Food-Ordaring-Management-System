const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/dbConnection.js");
const authRoute = require("./routes/authRoute.js");

//db Connection
connectDB();

//app config
const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
