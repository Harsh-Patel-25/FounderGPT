import { analyzeIdea } from "../services/aiService.js";
import database from "../config/database.js";
import logger from "../utils/logger.js";

/**
 * POST /api/analyze
 * Full startup idea analysis — problem, market, UVP, business model viability.
 */
export async function handleAnalyze(req, res, next) {
  try {
    const idea = req.validatedBody;

    // Check cache
    const cacheKey = database.createKey("analyze", idea);
    const cached = database.get(cacheKey);
    if (cached) {
      logger.info("Cache hit: analyze");
      return res.json({ status: "success", message: "Startup analysis complete", data: cached });
    }

    const result = await analyzeIdea(idea);

    database.save(cacheKey, result);

    res.json({
      status: "success",
      message: "Startup analysis complete",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}
