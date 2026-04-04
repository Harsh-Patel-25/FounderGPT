import { getCompleteDashboardData } from "../services/aiService.js";
import database from "../config/database.js";
import logger from "../utils/logger.js";

/**
 * POST /api/dashboard
 * Runs a single aggregate AI analysis to avoid rate limits.
 */
export async function handleDashboard(req, res, next) {
  try {
    const idea = req.validatedBody;

    const cacheKey = database.createKey("dashboard", idea);
    const cached = database.get(cacheKey);
    if (cached) {
      logger.info("Cache hit: dashboard");
      return res.json({ status: "success", message: "Dashboard ready", data: cached });
    }

    const result = await getCompleteDashboardData(idea);
    database.save(cacheKey, result);

    res.json({
      status: "success",
      message: "Dashboard ready",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}
