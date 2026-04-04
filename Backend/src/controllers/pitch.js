import { getPitch } from "../services/aiService.js";
import database from "../config/database.js";
import logger from "../utils/logger.js";

/**
 * POST /api/pitch
 * Generates an investor-ready pitch deck outline.
 */
export async function handlePitch(req, res, next) {
  try {
    const idea = req.validatedBody;

    const cacheKey = database.createKey("pitch", idea);
    const cached = database.get(cacheKey);
    if (cached) {
      logger.info("Cache hit: pitch");
      return res.json({ status: "success", message: "Pitch generated", data: cached });
    }

    const result = await getPitch(idea);

    database.save(cacheKey, result);

    res.json({
      status: "success",
      message: "Pitch generated",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}
