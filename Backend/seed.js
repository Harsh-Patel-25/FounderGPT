import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import "dotenv/config";
import User from "./src/models/User.js";

// Seed demo user
const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/foundergpt";
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");

    // Check if demo user already exists
    const existingUser = await User.findOne({ email: "demo@foundergpt.com" });
    if (existingUser) {
      console.log("Demo user already exists");
      await mongoose.disconnect();
      return;
    }

    // Create demo user
    const demoUser = new User({
      fullName: "Demo User",
      email: "demo@foundergpt.com",
      password: "demo123456",
      startupIdeas: [
        {
          idea: "AI-Powered Personal Finance App",
          description: "Mobile app that uses AI to provide personalized financial advice",
          industry: "FinTech",
          targetMarket: "25-45 years old professionals",
        },
      ],
    });

    await demoUser.save();
    console.log("✓ Demo user created successfully");
    console.log("Email: demo@foundergpt.com");
    console.log("Password: demo123456");

    await mongoose.disconnect();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDatabase();
