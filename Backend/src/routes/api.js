import { Router } from "express";
import validateRequest from "../middleware/validateRequest.js";
import { handleAnalyze } from "../controllers/analysis.js";
import { handleCompetitors } from "../controllers/competitor.js";
import { handleDashboard } from "../controllers/dashboard.js";
import { handleBusinessModel, handleRoadmap } from "../controllers/idea.js";
import { handlePitch } from "../controllers/pitch.js";
import { handleStartupScore } from "../controllers/score.js";
import { handleMarketPotential, handleGTMStrategy } from "../controllers/market.js";
import { handleTechStack, handleFunding, handleRiskAssessment } from "../controllers/strategy.js";
import { getServiceStatus, resetRateLimits } from "../services/aiService.js";
import researchRoutes from "./researchRoutes.js";

const router = Router();

// All routes receive a StartupIdea body and go through validation
router.post("/analyze", validateRequest, handleAnalyze);
router.post("/competitors", validateRequest, handleCompetitors);
router.post("/business-model", validateRequest, handleBusinessModel);
router.post("/roadmap", validateRequest, handleRoadmap);
router.post("/pitch", validateRequest, handlePitch);
router.post("/startup-score", validateRequest, handleStartupScore);
router.post("/market-potential", validateRequest, handleMarketPotential);
router.post("/gtm-strategy", validateRequest, handleGTMStrategy);
router.post("/tech-stack", validateRequest, handleTechStack);
router.post("/funding", validateRequest, handleFunding);
router.post("/risk-assessment", validateRequest, handleRiskAssessment);
router.post("/dashboard", validateRequest, handleDashboard);

// AI Service Status Endpoint
router.get("/ai-status", (req, res) => {
  const status = getServiceStatus();
  res.json({
    status: "success",
    data: status,
    message: "AI service status retrieved"
  });
});

// Reset Rate Limits (for development/testing)
router.post("/reset-ai-limits", (req, res) => {
  resetRateLimits();
  res.json({
    status: "success",
    message: "AI service rate limits reset"
  });
});

// Research Intelligence Agent Routes
router.use("/research", researchRoutes);

export default router;
