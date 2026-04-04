import { getStartupScore } from "../services/aiService.js";
import database from "../config/database.js";
import logger from "../utils/logger.js";

/**
 * POST /api/startup-score
 * Returns multi-dimensional startup viability scores.
 */
export async function handleStartupScore(req, res, next) {
  try {
    const idea = req.validatedBody;

    const cacheKey = database.createKey("score", idea);
    const cached = database.get(cacheKey);
    if (cached) {
      logger.info("Cache hit: startup-score");
      return res.json({ status: "success", message: "Score calculated", data: cached });
    }

    const result = await getStartupScore(idea);

    database.save(cacheKey, result);

    res.json({
      status: "success",
      message: "Score calculated",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}
