import { getMarketPotential, getGTMStrategy } from "../services/aiService.js";
import database from "../config/database.js";
import logger from "../utils/logger.js";

/**
 * POST /api/market-potential
 * Analyzes market size, growth, and opportunities
 */
export async function handleMarketPotential(req, res, next) {
  try {
    const idea = req.validatedBody;

    const cacheKey = database.createKey("market-potential", idea);
    const cached = database.get(cacheKey);
    if (cached) {
      logger.info("Cache hit: market-potential");
      return res.json({ status: "success", message: "Market analysis complete", data: cached });
    }

    const result = await getMarketPotential(idea);

    database.save(cacheKey, result);

    res.json({
      status: "success",
      message: "Market analysis complete",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/gtm-strategy
 * Generates go-to-market strategy
 */
export async function handleGTMStrategy(req, res, next) {
  try {
    const idea = req.validatedBody;

    const cacheKey = database.createKey("gtm-strategy", idea);
    const cached = database.get(cacheKey);
    if (cached) {
      logger.info("Cache hit: gtm-strategy");
      return res.json({ status: "success", message: "GTM strategy generated", data: cached });
    }

    const result = await getGTMStrategy(idea);

    database.save(cacheKey, result);

    res.json({
      status: "success",
      message: "GTM strategy generated",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}
