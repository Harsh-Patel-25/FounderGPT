import rateLimit from "express-rate-limit";

const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000; // 15 min
const max = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 50;

const rateLimiter = rateLimit({
  windowMs,
  max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: "error",
    message: `Too many requests — limit is ${max} per ${windowMs / 60000} minutes. Please try again later.`,
  },
});

export default rateLimiter;
