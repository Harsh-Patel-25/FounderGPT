import { getTechStackAndDependencies, getFundingRequirements, getRiskAssessment } from "../services/aiService.js";
import database from "../config/database.js";
import logger from "../utils/logger.js";

/**
 * POST /api/tech-stack
 * Recommends tech stack and infrastructure
 */
export async function handleTechStack(req, res, next) {
  try {
    const idea = req.validatedBody;

    const cacheKey = database.createKey("tech-stack", idea);
    const cached = database.get(cacheKey);
    if (cached) {
      logger.info("Cache hit: tech-stack");
      return res.json({ status: "success", message: "Tech stack analysis complete", data: cached });
    }

    const result = await getTechStackAndDependencies(idea);

    database.save(cacheKey, result);

    res.json({
      status: "success",
      message: "Tech stack analysis complete",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/funding
 * Estimates funding needs and burn rate
 */
export async function handleFunding(req, res, next) {
  try {
    const idea = req.validatedBody;

    const cacheKey = database.createKey("funding", idea);
    const cached = database.get(cacheKey);
    if (cached) {
      logger.info("Cache hit: funding");
      return res.json({ status: "success", message: "Funding analysis complete", data: cached });
    }

    const result = await getFundingRequirements(idea);

    database.save(cacheKey, result);

    res.json({
      status: "success",
      message: "Funding analysis complete",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/risk-assessment
 * Identifies and assesses key risks
 */
export async function handleRiskAssessment(req, res, next) {
  try {
    const idea = req.validatedBody;

    const cacheKey = database.createKey("risk-assessment", idea);
    const cached = database.get(cacheKey);
    if (cached) {
      logger.info("Cache hit: risk-assessment");
      return res.json({ status: "success", message: "Risk assessment complete", data: cached });
    }

    const result = await getRiskAssessment(idea);

    database.save(cacheKey, result);

    res.json({
      status: "success",
      message: "Risk assessment complete",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}
