import mongoose from "mongoose";
import logger from "../utils/logger.js";
import fs from "fs";
import path from "path";

// In-memory store for caching recent analyses (keep existing functionality)
const store = new Map();

const database = {
  save(key, data) {
    store.set(key, { data, createdAt: Date.now() });
  },

  get(key) {
    const entry = store.get(key);
    if (!entry) return null;
    // Expire after 1 hour
    if (Date.now() - entry.createdAt > 3_600_000) {
      store.delete(key);
      return null;
    }
    return entry.data;
  },

  /** Create a deterministic cache key from the idea payload */
  createKey(prefix, idea) {
    const raw = `${prefix}:${idea.idea}:${idea.industry || ""}:${idea.targetMarket || ""}`;
    // Simple hash for in-memory use
    let hash = 0;
    for (let i = 0; i < raw.length; i++) {
      hash = (hash << 5) - hash + raw.charCodeAt(i);
    }
    return `${prefix}:${hash}`;
  },
};

// JSON file-based user storage for fallback (development mode without MongoDB)
export const jsonDbPath = path.resolve("data/users.json");

export const ensureJsonDbDir = () => {
  const dir = path.dirname(jsonDbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

export const getJsonUsers = () => {
  if (!fs.existsSync(jsonDbPath)) {
    return [];
  }
  try {
    const data = fs.readFileSync(jsonDbPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

export const saveJsonUsers = (users) => {
  ensureJsonDbDir();
  fs.writeFileSync(jsonDbPath, JSON.stringify(users, null, 2));
};

/**
 * Connect to MongoDB
 */
export const connectDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/foundergpt";
    await mongoose.connect(mongoUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });
    logger.info("✓ Connected to MongoDB successfully");
    return true;
  } catch (error) {
    logger.warn("⚠️  MongoDB not available - falling back to JSON file storage");
    logger.warn("   For production, configure MongoDB in Backend/.env MONGODB_URI");
    logger.warn("   Download MongoDB: https://www.mongodb.com/try/download/community");
    
    // Initialize JSON file storage for fallback
    ensureJsonDbDir();
    if (!fs.existsSync(jsonDbPath)) {
      saveJsonUsers([]);
    }
    return false;
  }
};

export default database;


