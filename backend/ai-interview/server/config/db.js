import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set("bufferCommands", false);

    await mongoose.connect(process.env.MONGO_URI, {
     serverSelectionTimeoutMS: 5000,
    });

    console.log("✅ MongoDB Connected");
    console.log("📦 DB Name:", mongoose.connection.name);

  } catch (error) {
    console.error("❌ DB connection error:", error);
    process.exit(1);
  }
};

   // 👈 IMPORTANT
export default connectDB ;