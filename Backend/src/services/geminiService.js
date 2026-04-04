import { GoogleGenerativeAI } from "@google/generative-ai";
import logger from "../utils/logger.js";

let genAI = null;

function getModel() {
  if (!genAI) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set. Add it to Backend/src/.env");
    }
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    },
  });
}

/**
 * Generic helper: sends a prompt to Gemini and returns parsed JSON.
 */
export async function askGemini(systemPrompt, userPrompt) {
  const model = getModel();
  
  const fullPrompt = `System: ${systemPrompt}\n\nClient Idea: ${userPrompt}`;
  
  try {
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    
    // Low-level text extraction to be super safe
    let text = "";
    try {
      if (typeof response.text === "function") {
        text = response.text();
      } else if (response.candidates?.[0]?.content?.parts?.[0]?.text) {
        text = response.candidates[0].content.parts[0].text;
      } else {
        text = response.text; // Fallback to property
      }
    } catch (e) {
      // If .text() failed, try the low-level path
      if (response.candidates?.[0]?.content?.parts?.[0]?.text) {
        text = response.candidates[0].content.parts[0].text;
      }
    }
    
    if (!text) {
      logger.error("Gemini returned empty text. Full response: " + JSON.stringify(response));
      throw new Error("AI returned an empty response. Check safety filters or prompt.");
    }
    
    return JSON.parse(text);
  } catch (err) {
    logger.error("Gemini Error: " + err.message);
    if (err.message.includes("JSON")) {
      logger.error("Failed to parse Gemini response as JSON. Raw text was logged above.");
    }
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
  logger.info("Gemini → analyzeIdea");
  return askGemini(
    `You are a world-class startup analyst. Analyze the following startup idea and return a JSON object with this exact structure:
{
  "analysis": [
    {
      "title": "Problem & Target Audience",
      "description": "detailed analysis paragraph",
      "score": 8.5,
      "details": ["bullet 1", "bullet 2", "bullet 3"]
    },
    {
      "title": "Market Opportunity",
      "description": "detailed analysis paragraph",
      "score": 7.8,
      "details": ["bullet 1", "bullet 2"]
    },
    {
      "title": "Unique Value Proposition",
      "description": "detailed analysis paragraph",
      "score": 8.0,
      "details": ["bullet 1", "bullet 2"]
    },
    {
      "title": "Business Model Viability",
      "description": "detailed analysis paragraph",
      "score": 7.5,
      "details": ["bullet 1", "bullet 2"]
    }
  ]
}
Scores should be between 1 and 10. Be specific, data-driven, and insightful.`,
    ideaContext(idea)
  );
}

export async function getCompetitors(idea) {
  logger.info("Gemini → getCompetitors");
  return askGemini(
    `You are a competitive intelligence expert. Identify 4-6 real competitors for the following startup idea. Return a JSON object with this exact structure:
{
  "competitors": [
    {
      "name": "Company Name",
      "strengths": ["strength 1", "strength 2"],
      "weaknesses": ["weakness 1", "weakness 2"]
    }
  ]
}
Use real companies when possible. Be specific and accurate.`,
    ideaContext(idea)
  );
}

export async function getBusinessModel(idea) {
  logger.info("Gemini → getBusinessModel");
  return askGemini(
    `You are a business strategy consultant. Suggest the best business model for the following startup idea. Return a JSON object with this exact structure:
{
  "businessModel": {
    "type": "e.g. Freemium SaaS",
    "description": "detailed description of the recommended business model",
    "revenueStreams": ["stream 1", "stream 2", "stream 3"],
    "pricingStrategy": "description of pricing tiers",
    "unitEconomics": "brief unit economics overview"
  }
}
Be specific with numbers and percentages where possible.`,
    ideaContext(idea)
  );
}

export async function getRoadmap(idea) {
  logger.info("Gemini → getRoadmap");
  return askGemini(
    `You are a product strategy expert. Create a product roadmap for the following startup idea. Return a JSON object with this exact structure:
{
  "roadmap": {
    "phases": [
      {
        "name": "Phase 1: MVP",
        "duration": "2–3 months",
        "goals": ["goal 1", "goal 2"],
        "features": ["feature 1", "feature 2"]
      },
      {
        "name": "Phase 2: Growth",
        "duration": "3–6 months",
        "goals": ["goal 1"],
        "features": ["feature 1", "feature 2"]
      },
      {
        "name": "Phase 3: Scale",
        "duration": "6–12 months",
        "goals": ["goal 1"],
        "features": ["feature 1", "feature 2"]
      }
    ]
  }
}
Be actionable and realistic.`,
    ideaContext(idea)
  );
}

export async function getPitch(idea) {
  logger.info("Gemini → getPitch");
  return askGemini(
    `You are an expert pitch-deck writer who has helped founders raise millions. Generate a compelling investor pitch for the following startup idea. Return a JSON object with this exact structure:
{
  "pitch": {
    "title": "Startup Name – Tagline",
    "sections": [
      { "heading": "Problem", "content": "paragraph" },
      { "heading": "Solution", "content": "paragraph" },
      { "heading": "Market Size", "content": "paragraph with TAM/SAM/SOM" },
      { "heading": "Business Model", "content": "paragraph" },
      { "heading": "Traction", "content": "paragraph" },
      { "heading": "Ask", "content": "paragraph" }
    ]
  }
}
Make it compelling, data-driven, and investor-ready.`,
    ideaContext(idea)
  );
}

export async function getStartupScore(idea) {
  logger.info("Gemini → getStartupScore");
  return askGemini(
    `You are a startup evaluation expert. Score the following startup idea across key dimensions. Return a JSON object with this exact structure:
{
  "score": {
    "overall": 7.6,
    "marketFit": 8.2,
    "innovation": 7.0,
    "feasibility": 6.5,
    "scalability": 8.0,
    "labels": ["Market Demand", "Competition Level", "Revenue Potential", "Technical Difficulty"],
    "values": [8.2, 6.5, 7.8, 5.4],
    "summary": "brief overall assessment paragraph"
  }
}
All scores should be between 1 and 10 (decimals OK). Be honest and data-driven.`,
    ideaContext(idea)
  );
}

/**
 * NEW: Unified Dashboard Analysis
 * Combines all major analyses into one single AI call to handle free-tier rate limits.
 */
export async function getCompleteDashboardData(idea) {
  logger.info("Gemini → getCompleteDashboardData (Unified Call)");
  return askGemini(
    `You are an elite startup consultant and venture capitalist. 
Analyze the following startup idea comprehensively and return a SINGLE JSON object with the exact structure below. 

CRITICAL: You must return ONLY valid JSON. Accuracy and depth are paramount.

JSON Structure:
{
  "analysis": {
    "analysis": [
      {
        "title": "Problem & Target Audience",
        "description": "...",
        "score": 8.5,
        "details": ["...", "..."]
      },
      {
        "title": "Market Opportunity",
        "description": "...",
        "score": 7.8,
        "details": ["...", "..."]
      },
      {
        "title": "Unique Value Proposition",
        "description": "...",
        "score": 8.0,
        "details": ["...", "..."]
      },
      {
        "title": "Business Model Viability",
        "description": "...",
        "score": 7.5,
        "details": ["...", "..."]
      }
    ]
  },
  "competitors": {
    "competitors": [
      {
        "name": "Company X",
        "strengths": ["...", "..."],
        "weaknesses": ["...", "..."]
      }
    ]
  },
  "businessModel": {
    "businessModel": {
      "type": "...",
      "description": "...",
      "revenueStreams": ["...", "..."],
      "pricingStrategy": "...",
      "unitEconomics": "..."
    }
  },
  "score": {
    "score": {
      "overall": 7.6,
      "marketFit": 8.2,
      "innovation": 7.0,
      "feasibility": 6.5,
      "scalability": 8.0,
      "labels": ["Market Demand", "Competition Level", "Revenue Potential", "Technical Difficulty"],
      "values": [8.2, 6.5, 7.8, 5.4],
      "summary": "..."
    }
  }
}

Be specific, data-driven, and insightful. For the competitors, use real-world companies if they exist.`,
    ideaContext(idea)
  );
}

/**
 * NEW: Market Potential Analysis
 * Analyzes market size, growth rate, and opportunity
 */
export async function getMarketPotential(idea) {
  logger.info("Gemini → getMarketPotential");
  return askGemini(
    `You are a market research expert. Analyze the market potential for the following startup idea. Return a JSON object with this exact structure:
{
  "marketPotential": {
    "tamSamSom": {
      "tam": "Total Addressable Market in $B or description",
      "sam": "Serviceable Available Market",
      "som": "Serviceable Obtainable Market"
    },
    "marketGrowthRate": "X% CAGR with timeframe",
    "marketTrends": ["trend 1", "trend 2", "trend 3"],
    "targetDemographics": {
      "primary": ["demographic 1", "demographic 2"],
      "secondary": ["demographic 1", "demographic 2"]
    },
    "marketPenetrationStrategy": "How to penetrate the market",
    "marketRisks": ["risk 1", "risk 2"],
    "opportunities": ["opportunity 1", "opportunity 2", "opportunity 3"]
  }
}
Be specific with market sizing data and realistic growth projections.`,
    ideaContext(idea)
  );
}

/**
 * NEW: Tech Stack & Dependencies Analysis
 * Suggests tech stack, infrastructure, and dependencies
 */
export async function getTechStackAndDependencies(idea) {
  logger.info("Gemini → getTechStackAndDependencies");
  return askGemini(
    `You are a tech architect. Recommend the optimal tech stack and dependencies for the following startup idea. Return a JSON object with this exact structure:
{
  "techStack": {
    "frontend": ["tech 1", "tech 2"],
    "backend": ["tech 1", "tech 2"],
    "database": ["tech 1"],
    "infrastructure": ["AWS/GCP/Azure service", "..."],
    "thirdPartyServices": ["service 1", "service 2"],
    "developmentTools": ["tool 1", "tool 2"]
  },
  "scopes": {
    "phase1MVP": {
      "scope": "description of MVP scope",
      "technologies": ["tech 1", "tech 2"],
      "estimatedDevelopmentTime": "X weeks"
    },
    "phase2Growth": {
      "scope": "description",
      "technologies": ["tech 1", "tech 2"],
      "estimatedDevelopmentTime": "X weeks"
    },
    "phase3Scale": {
      "scope": "description",
      "technologies": ["tech 1", "tech 2"],
      "estimatedDevelopmentTime": "X weeks"
    }
  },
  "infrastructureNeeds": {
    "hosting": "recommended hosting",
    "scalability": "scaling strategy",
    "security": "security considerations",
    "monitoring": "monitoring and logging setup"
  }
}
Be practical and production-ready.`,
    ideaContext(idea)
  );
}

/**
 * NEW: Funding Requirements & Burn Rate
 * Estimates funding needs and burn rate
 */
export async function getFundingRequirements(idea) {
  logger.info("Gemini → getFundingRequirements");
  return askGemini(
    `You are a startup finance expert. Estimate the funding requirements and burn rate for the following startup idea. Return a JSON object with this exact structure:
{
  "fundingRequirements": {
    "seed": {
      "amount": "$X amount or range",
      "timeframe": "months to raise",
      "uses": ["use 1", "use 2", "use 3"]
    },
    "seriesA": {
      "amount": "$X amount or range",
      "timeframe": "months from seed",
      "uses": ["use 1", "use 2"]
    }
  },
  "burnRate": {
    "monthlyBurn": "$X/month estimate",
    "runway": "X months with seed funding",
    "breakEvenTimeline": "X months from launch"
  },
  "teamComposition": [
    {"role": "CEO/Founder", "salary": "$X", "timing": "immediate"},
    {"role": "Tech Lead", "salary": "$X", "timing": "month X"}
  ],
  "keyExpenses": {
    "personnel": "X% of budget",
    "infrastructure": "X% of budget",
    "marketing": "X% of budget",
    "operations": "X% of budget"
  },
  "fundingStrategy": "recommended approach to raise capital"
}
Provide realistic numbers based on industry benchmarks.`,
    ideaContext(idea)
  );
}

/**
 * NEW: Risk Assessment
 * Identifies and scores key risks
 */
export async function getRiskAssessment(idea) {
  logger.info("Gemini → getRiskAssessment");
  return askGemini(
    `You are a risk management consultant. Identify and assess key risks for the following startup idea. Return a JSON object with this exact structure:
{
  "riskAssessment": {
    "risks": [
      {
        "category": "Market/Team/Technical/Competitive",
        "risk": "description of the risk",
        "probability": 7,
        "impact": 8,
        "mitigation": "how to mitigate this risk"
      }
    ],
    "criticalSuccessFactors": ["factor 1", "factor 2", "factor 3"],
    "swot": {
      "strengths": ["strength 1", "strength 2"],
      "weaknesses": ["weakness 1", "weakness 2"],
      "opportunities": ["opportunity 1", "opportunity 2"],
      "threats": ["threat 1", "threat 2"]
    },
    "overallRiskScore": 6.2
  }
}
Scores should be 1-10. Be thorough and realistic.`,
    ideaContext(idea)
  );
}

/**
 * NEW: Go-to-Market Strategy
 * Detailed market entry and acquisition strategy
 */
export async function getGoToMarketStrategy(idea) {
  logger.info("Gemini → getGoToMarketStrategy");
  return askGemini(
    `You are a growth strategy expert. Create a detailed go-to-market strategy for the following startup idea. Return a JSON object with this exact structure:
{
  "gtmStrategy": {
    "marketEntry": {
      "geographicFocus": "primary geographic market",
      "initialSegment": "first customer segment to target",
      "rationale": "why this segment first"
    },
    "acquisitionChannels": [
      {
        "channel": "e.g., Organic/Content Marketing",
        "description": "how to acquire users",
        "cadAssumption": "CAC estimate",
        "timeline": "when to activate"
      }
    ],
    "priceStrategy": "pricing psychology and positioning",
    "partnershipOpportunities": ["partner type 1", "partner type 2"],
    "first90Days": [
      "action 1",
      "action 2",
      "action 3"
    ],
    "metricsToTrack": ["metric 1", "metric 2", "metric 3"],
    "competitivePositioning": "how to position against competitors"
  }
}
Be specific and actionable.`,
    ideaContext(idea)
  );
}
