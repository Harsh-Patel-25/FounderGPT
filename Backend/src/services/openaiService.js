import OpenAI from "openai";
import logger from "../utils/logger.js";

let client = null;

function getClient() {
  if (!client) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not set. Add it to Backend/.env");
    }
    client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return client;
}

/**
 * Generic helper: sends a prompt to OpenAI and returns parsed JSON.
 */
export async function askOpenAI(systemPrompt, userPrompt) {
  const openai = getClient();
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  try {
    const response = await openai.chat.completions.create({
      model: model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    });

    const text = response.choices[0].message.content;
    
    if (!text) {
      throw new Error("AI returned an empty response.");
    }
    
    return JSON.parse(text);
  } catch (err) {
    logger.error("OpenAI Error: " + err.message);
    throw err;
  }
}

/** Build a context string from the idea payload */
function ideaContext({ idea, industry, targetMarket }) {
  let ctx = `Startup Idea: ${idea}`;
  if (industry) ctx += `\nIndustry: ${industry}`;
  if (targetMarket) ctx += `\nTarget Market: ${targetMarket}`;
  return ctx;
}

// ─── Public API ────────────────────────────────────────────────

export async function analyzeIdea(idea) {
  logger.info("OpenAI → analyzeIdea");
  return askOpenAI(
    `You are a world-class startup analyst. Analyze the startup idea and return a JSON object:
{
  "analysis": [
    { "title": "Problem & Target Audience", "description": "...", "score": 8.5, "details": ["...", "..."] },
    { "title": "Market Opportunity", "description": "...", "score": 7.8, "details": ["...", "..."] },
    { "title": "Unique Value Proposition", "description": "...", "score": 8.0, "details": ["...", "..."] },
    { "title": "Business Model Viability", "description": "...", "score": 7.5, "details": ["...", "..."] }
  ]
}`,
    ideaContext(idea)
  );
}

export async function getCompetitors(idea) {
  logger.info("OpenAI → getCompetitors");
  return askOpenAI(
    `Identify 4-6 real competitors for the startup idea. Return JSON:
{
  "competitors": [
    { "name": "...", "strengths": ["...", "..."], "weaknesses": ["...", "..."] }
  ]
}`,
    ideaContext(idea)
  );
}

export async function getBusinessModel(idea) {
  logger.info("OpenAI → getBusinessModel");
  return askOpenAI(
    `Suggest the best business model. Return JSON:
{
  "businessModel": {
    "type": "...", "description": "...", "revenueStreams": ["...", "..."], "pricingStrategy": "...", "unitEconomics": "..."
  }
}`,
    ideaContext(idea)
  );
}

export async function getRoadmap(idea) {
  logger.info("OpenAI → getRoadmap");
  return askOpenAI(
    `Create a product roadmap with Phase 1: MVP, Phase 2: Growth, and Phase 3: Scale. Return JSON:
{
  "roadmap": {
    "phases": [
      { "name": "...", "duration": "...", "goals": ["..."], "features": ["..."] }
    ]
  }
}`,
    ideaContext(idea)
  );
}

export async function getPitch(idea) {
  logger.info("OpenAI → getPitch");
  return askOpenAI(
    `Generate an investor pitch with sections: Problem, Solution, Market Size, Business Model, Traction, and Ask. Return JSON:
{
  "pitch": {
    "title": "...",
    "sections": [{ "heading": "...", "content": "..." }]
  }
}`,
    ideaContext(idea)
  );
}

export async function getStartupScore(idea) {
  logger.info("OpenAI → getStartupScore");
  return askOpenAI(
    `Score the startup idea across dimensions (1-10). Return JSON:
{
  "score": {
    "overall": 7.6, "marketFit": 8.2, "innovation": 7.0, "feasibility": 6.5, "scalability": 8.0,
    "labels": ["Market Demand", "Competition", "Revenue", "Difficulty"],
    "values": [8.2, 6.5, 7.8, 5.4], "summary": "..."
  }
}`,
    ideaContext(idea)
  );
}

export async function getCompleteDashboardData(idea) {
  logger.info("OpenAI → getCompleteDashboardData (Unified)");
  return askOpenAI(
    `Analyze the startup idea comprehensively and return a SINGLE JSON object exactly like this:
{
  "analysis": { "analysis": [...] },
  "competitors": { "competitors": [...] },
  "businessModel": { "businessModel": {...} },
  "score": { "score": {...} }
}`,
    ideaContext(idea)
  );
}
