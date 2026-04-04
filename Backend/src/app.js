
import net from "net";
import express from "express";
import cors from "cors";
import compression from "compression";
import logger from "./utils/logger.js";
import rateLimiter from "./middleware/rateLimiter.js";
import errorHandler from "./middleware/errorHandler.js";
import apiRoutes from "./routes/api.js";
import authRoutes from "./routes/auth.js";
import { connectDatabase } from "./config/database.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const DEFAULT_PORT = parseInt(process.env.PORT || "5000", 10);

async function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", () => {
      resolve(false);
    });
    server.once("listening", () => {
      server.close(() => resolve(true));
    });
    server.listen(port);
  });
}

async function findAvailablePort(startPort) {
  let port = startPort;
  for (let i = 0; i < 10; i += 1) {
    if (await isPortAvailable(port)) {
      return port;
    }
    port += 1;
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

// ─── Global Middleware ──────────────────────────────────────────
app.use(compression()); // Enable gzip compression

app.use(cors({
  origin: true, // Allow all origins for development
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json({ limit: "1mb" }));
app.use(rateLimiter);

// ─── Request Logger ─────────────────────────────────────────────
app.use((req, _res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// ─── Health Check ───────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.set('Cache-Control', 'public, max-age=300'); // Cache for 5 minutes
  res.json({
    status: "success",
    message: "FounderGPT API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// ─── Authentication Routes ──────────────────────────────────────
app.use("/api/auth", authRoutes);

// ─── API Routes ─────────────────────────────────────────────────
app.use("/api", apiRoutes);

// ─── 404 Handler ────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

// ─── Error Handler (must be last) ───────────────────────────────
app.use(errorHandler);

// ─── Start Server ───────────────────────────────────────────────
const startServer = async () => {
  // Connect to MongoDB
  const dbConnected = await connectDatabase();
  const port = await findAvailablePort(DEFAULT_PORT);

  const server = app.listen(port, () => {
    logger.info(`🚀 FounderGPT API running on http://localhost:${port}`);
    logger.info(`📋 Health check: http://localhost:${port}/api/health`);
    logger.info(`🔐 Auth endpoints: POST /api/auth/register, POST /api/auth/login`);

    if (!dbConnected) {
      logger.warn("⚠️  Running without database - user authentication will not persist");
    }

    const hasAIProvider = Boolean(
      process.env.NVIDIA_API_KEY ||
      process.env.OPENAI_API_KEY ||
      process.env.GEMINI_API_KEY
    );

    if (!hasAIProvider) {
      logger.warn("⚠️  No AI provider configured. Set NVIDIA_API_KEY, OPENAI_API_KEY, or GEMINI_API_KEY in Backend/.env.");
      logger.warn("⚠️  In development, local fallback responses are enabled, but real AI results will require a configured provider.");
    }

    if (port !== DEFAULT_PORT) {
      logger.warn(`⚠️  Port ${DEFAULT_PORT} was in use; started server on port ${port} instead.`);
    }
  });

  server.on("error", (error) => {
    logger.error(`Server startup error: ${error.message}`);
    process.exit(1);
  });
};

startServer();

export default app;