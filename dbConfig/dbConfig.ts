import mongoose from "mongoose";

export async function connect() {
  if (mongoose.connection.readyState >= 1) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      serverSelectionTimeoutMS: 10000 // 10 seconds
    });
    console.log("MongoDB connected successfully");
  } catch (error: any) {
    console.error("MongoDB connection error: " + error.message);
    throw new Error("Failed to connect to MongoDB");
  }

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error: " + err);
  });
}