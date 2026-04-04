import { Router } from "express";
import rateLimit from "express-rate-limit";
import validateRequest from "../middleware/validateRequest.js";
import { handleResearchAnalyze } from "../controllers/researchController.js";

// Research-specific rate limiter (more restrictive due to external API costs)
const researchLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 research analyses per 15 minutes
  message: {
    status: "error",
    message: "Too many research requests. Please wait 15 minutes before trying again."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const router = Router();

// Research Intelligence Agent route with validation and rate limiting
router.post("/analyze", researchLimiter, validateRequest, handleResearchAnalyze);

export default router;