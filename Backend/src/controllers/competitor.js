import { getCompetitors } from "../services/aiService.js";
import database from "../config/database.js";
import logger from "../utils/logger.js";

/**
 * POST /api/competitors
 * Identifies real competitors with strengths & weaknesses.
 */
export async function handleCompetitors(req, res, next) {
  try {
    const idea = req.validatedBody;

    const cacheKey = database.createKey("competitors", idea);
    const cached = database.get(cacheKey);
    if (cached) {
      logger.info("Cache hit: competitors");
      return res.json({ status: "success", message: "Competitor analysis complete", data: cached });
    }

    const result = await getCompetitors(idea);

    database.save(cacheKey, result);

    res.json({
      status: "success",
      message: "Competitor analysis complete",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}
