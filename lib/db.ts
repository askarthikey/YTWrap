// lib/db.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env",
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  try {
    const opts = {
      bufferCommands: true,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts);
    cached.conn = await cached.promise;

    console.log("MongoDB connected successfully");
    return cached.conn;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    cached.promise = null;
    throw error;
  }
}
