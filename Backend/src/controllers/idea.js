import { getBusinessModel, getRoadmap } from "../services/aiService.js";
import database from "../config/database.js";
import logger from "../utils/logger.js";

/**
 * POST /api/business-model
 * Returns a recommended business model with revenue streams.
 */
export async function handleBusinessModel(req, res, next) {
  try {
    const idea = req.validatedBody;

    const cacheKey = database.createKey("business-model", idea);
    const cached = database.get(cacheKey);
    if (cached) {
      logger.info("Cache hit: business-model");
      return res.json({ status: "success", message: "Business model generated", data: cached });
    }

    const result = await getBusinessModel(idea);

    database.save(cacheKey, result);

    res.json({
      status: "success",
      message: "Business model generated",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/roadmap
 * Returns a phased product roadmap.
 */
export async function handleRoadmap(req, res, next) {
  try {
    const idea = req.validatedBody;

    const cacheKey = database.createKey("roadmap", idea);
    const cached = database.get(cacheKey);
    if (cached) {
      logger.info("Cache hit: roadmap");
      return res.json({ status: "success", message: "Roadmap generated", data: cached });
    }

    const result = await getRoadmap(idea);

    database.save(cacheKey, result);

    res.json({
      status: "success",
      message: "Roadmap generated",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}
