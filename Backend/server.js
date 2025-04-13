import express from "express";
import cors from "cors";
import { connectDB } from "./config/dbConnection.js";

//app config
const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json());

//db Connection
connectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
