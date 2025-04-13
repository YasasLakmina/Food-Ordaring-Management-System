import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://yasaslakmina:<yasaslakmina>@cluster001.lpmptt6.mongodb.net/food-ordering-app?retryWrites=true&w=majority&appName=Cluster001"
    )
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
    });
};
